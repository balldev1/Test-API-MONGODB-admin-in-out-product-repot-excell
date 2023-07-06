import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios';
import { InProduct, OutProduct } from '@prisma/client';
import { format } from 'date-fns';
const XLSX = require('xlsx');


const Reportproduct = () => {

    const [inProductData, setInProducts] = useState<InProduct[]>([]);
    const [outProductData, setOutProducts] = useState<OutProduct[]>([]);

    // {api}
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [inProductsres, outProductsres] = await Promise.all([
                    axios.get('/api/reportIn'),
                    axios.get('/api/reportOut'),
                ])

                const inProductsData = inProductsres.data;
                const outProductsData = outProductsres.data;

                setInProducts(inProductsData);
                setOutProducts(outProductsData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [inProductData, outProductData]);

    const handleExport = () => {
        axios.all([
            axios.get('/api/reportIn'),
            axios.get('/api/reportOut'),
        ])
            .then(axios.spread((inProductResponse, outProductResponse) => {
                const inProductData = inProductResponse.data;
                const outProductData = outProductResponse.data;

                // สร้าง Workbook
                const workbook = XLSX.utils.book_new();

                // สร้าง Worksheet สำหรับ inProduct
                const inProductSheet = XLSX.utils.json_to_sheet(inProductData);
                XLSX.utils.book_append_sheet(workbook, inProductSheet, 'reportIn');

                // สร้าง Worksheet สำหรับ outProduct
                const outProductSheet = XLSX.utils.json_to_sheet(outProductData);
                XLSX.utils.book_append_sheet(workbook, outProductSheet, 'reportOut');

                // สร้างไฟล์ Excel
                XLSX.writeFile(workbook, 'products.xlsx');
            }))
            .catch((error) => console.error(error));
    }


    const handleExportClick = useCallback(() => {
        handleExport();
    }, []);

    return (


        <div>
            <table className='border-2 w-[700px]'>
                <thead>
                    <tr>
                        <th className='border-2'>Date</th>
                        <th className='border-2'>Time</th>
                        <th className='border-2'>In</th>
                        <th className='border-2'>Out</th>
                        <th className='border-2'>Remark</th>
                        <th className='border-2'>Product Name</th>
                    </tr>
                </thead>
                <tbody>
                    {inProductData.map((inProduct) => {
                        const matchingOutProduct = outProductData.find((outProduct) => outProduct.userId === outProduct.userId);

                        return (
                            <tr key={inProduct.id}>
                                <td className='border-2'>{inProduct.date ? format(new Date(inProduct.date), 'dd-MM-yyyy') : ''}</td>
                                <td className='border-2'>{inProduct.time ? format(new Date(inProduct.time), 'HH:mm:ss') : ''}</td>
                                <td className='border-2'>{inProduct.amount}</td>
                                <td className='border-2'>{''}</td>
                                <td className='border-2'>{inProduct.remark}</td>
                                <td className='border-2'>{inProduct.product}</td>
                            </tr>

                        );
                    })}

                    {outProductData.map((inProduct) => {
                        const matchingOutProduct = outProductData.find((outProduct) => outProduct.userId === outProduct.userId);

                        return (
                            <tr key={inProduct.id}>
                                <td className='border-2'>{inProduct.date ? format(new Date(inProduct.date), 'dd-MM-yyyy') : ''}</td>
                                <td className='border-2'>{inProduct.time ? format(new Date(inProduct.time), 'HH:mm:ss') : ''}</td>
                                <td className='border-2'>{''}</td>
                                <td className='border-2'>{inProduct.outamount}</td>
                                <td className='border-2'>{inProduct.remark}</td>
                                <td className='border-2'>{inProduct.product}</td>
                            </tr>

                        );
                    })}
                </tbody>
            </table>

            <button onClick={handleExportClick}
                className='flex ml-auto border-2 bg-red-200 text-xl '
            >Export to Excel</button>
        </div>
    )
}

export default Reportproduct



