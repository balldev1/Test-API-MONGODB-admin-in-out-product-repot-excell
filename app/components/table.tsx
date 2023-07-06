'use client'

import axios from "axios";
import react, { useState, useCallback } from "react";
import { Toaster, toast } from 'react-hot-toast';
import Reportproduct from "./Reportproduct";



const Tabs = ({ }) => {

    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [product, setProduct] = useState('');
    const [outamount, setOutAmount] = useState('');
    const [amount, setAmount] = useState('');
    const [remark, setRemark] = useState('');
    const [inputValue, setInputValue] = useState('');

    const [toggleState, setToggleState] = useState(1);


    const toggleTab = (i: any) => {
        setToggleState(i);
    };

    const resetInput = () => {
        setDate('');
        setTime('');
        setProduct('');
        setAmount('');
        setRemark('');

        toast.success('Reset successfully')
    };

    // {in Product}
    const inProduct = useCallback(async () => {
        try {
            await axios.post("/api/in", {
                date,
                time,
                product,
                amount,
                remark,
            });

            toast.success('Successfully')

        } catch (error) {
            console.log(error);
            toast.error('Something went wrong')
        }

    }, [date, time, product, amount, remark]);


    const outProduct = useCallback(async () => {
        try {
            await axios.post("/api/out", {
                date,
                time,
                product,
                outamount,
                remark,
            });

            toast.success('Successfully')

        } catch (error) {
            console.log(error);
            toast.error('Something went wrong')
        }

    }, [date, time, product, outamount, remark]);


    return (

        <div className="max-w-3xl mx-auto px-8">
            <Toaster />
            <div
                role="tablist"
                aria-label="tabs"
                className="relative mx-auto h-12 grid grid-cols-3 items-center px-[3px] rounded-full bg-gray-900/20 overflow-hidden"
            >
                <div className="absolute indicator h-10 my-auto top-0 bottom-0 left-0 rounded-full bg-white"></div>
                <button
                    className={`relative block h-10 px-6 tab rounded-full ${toggleState === 1 ? 'bg-white' : ''
                        }`}
                    onClick={() => toggleTab(1)}
                >
                    <span className="text-gray-800">In</span>
                </button>
                <button
                    className={`relative block h-10 px-6 tab rounded-full ${toggleState === 2 ? 'bg-white' : ''
                        }`}
                    onClick={() => toggleTab(2)}
                >
                    <span className="text-gray-800">Out</span>
                </button>
                <button
                    className={`relative block h-10 px-6 tab rounded-full ${toggleState === 3 ? 'bg-white' : ''
                        }`}
                    onClick={() => toggleTab(3)}
                >
                    <span className="text-gray-800">Report</span>
                </button>
            </div>

            {/* input */}

            <div
                className={` ${toggleState === 3 ? 'hidden' : ''} ${toggleState === 2 ? 'hidden' : ''}
            flex flex-col mt-2 relative   rounded-3xl bg-purple-50 border-2 w-[400px]`}>
                <h1 className="text-xl flex items-center justify-center mt-5">In Product</h1>
                <div
                    role="tabpanel"

                    className=" flex flex-row tab-panel p-5 justify-between" >
                    <h1>Date</h1>
                    <input className="border-2"
                        onChange={(e: any) => setDate(e.target.value)}
                        id='name'
                        type='date'
                        value={date} />
                </div>
                <div
                    role="tabpanel"

                    className=" flex flex-row tab-panel p-5 justify-between" >
                    <h1>Time</h1>
                    <input className="border-2"
                        onChange={(e: any) => setTime(e.target.value)}
                        id='time'
                        type='time'
                        value={time} />
                </div>
                <div
                    role="tabpanel"

                    className=" flex flex-row tab-panel p-5 justify-between" >
                    <h1>Product</h1>
                    <input className="border-2"
                        onChange={(e: any) => setProduct(e.target.value)}
                        id='products'
                        type='text'
                        value={product} />
                </div>
                <div
                    role="tabpanel"

                    className=" flex flex-row tab-panel p-5 justify-between" >
                    <h1>Amount</h1>
                    <input className="border-2"
                        onChange={(e: any) => setAmount(e.target.value)}
                        id='amount'
                        type='number'
                        value={amount} />
                </div>
                <div
                    role="tabpanel"

                    className=" flex flex-row tab-panel p-5 justify-between" >
                    <h1>Remark</h1>
                    <input className="border-2"
                        onChange={(e: any) => setRemark(e.target.value)}
                        id='remark'
                        type='text'
                        value={remark} />
                </div>
                <div className="flex items-center justify-center rounded-md "  >
                    <button onClick={inProduct}
                        className="p-[10px] text-black text-xl mb-5 rounded-md  bg-blue-300" >submit</button>
                    <button onClick={resetInput}
                        className="p-[10px] text-black text-xl  ml-5 mb-5 border rounded-md bg-red-300" >reset </button>

                </div>
            </div>

            {/* {2} */}
            <div className={` ${toggleState === 1 ? 'hidden' : ''} ${toggleState === 3 ? 'hidden' : ''}
            flex flex-col mt-2 relative   rounded-3xl bg-purple-50 border-2 w-[400px]`}>
                <h1 className="text-xl flex items-center justify-center mt-5">Out Product</h1>
                <div
                    role="tabpanel"

                    className=" flex flex-row tab-panel p-5 justify-between" >
                    <h1>Date</h1>
                    <input className="border-2"
                        onChange={(e: any) => setDate(e.target.value)}
                        id='name'
                        type='date'
                        value={date} />
                </div>
                <div
                    role="tabpanel"

                    className=" flex flex-row tab-panel p-5 justify-between" >
                    <h1>Time</h1>
                    <input className="border-2"
                        onChange={(e: any) => setTime(e.target.value)}
                        id='time'
                        type='time'
                        value={time} />
                </div>
                <div
                    role="tabpanel"

                    className=" flex flex-row tab-panel p-5 justify-between" >
                    <h1>Product</h1>
                    <input className="border-2"
                        onChange={(e: any) => setProduct(e.target.value)}
                        id='products'
                        type='text'
                        value={product} />
                </div>
                <div
                    role="tabpanel"

                    className=" flex flex-row tab-panel p-5 justify-between" >
                    <h1>Amount</h1>
                    <input className="border-2"
                        onChange={(e: any) => setOutAmount(e.target.value)}
                        id='amount2'
                        type='number'
                        value={outamount} />
                </div>
                <div
                    role="tabpanel"

                    className=" flex flex-row tab-panel p-5 justify-between" >
                    <h1>Remark</h1>
                    <input className="border-2"
                        onChange={(e: any) => setRemark(e.target.value)}
                        id='remark'
                        type='text'
                        value={remark} />
                </div>
                <div className="flex items-center justify-center rounded-md "  >
                    <button onClick={outProduct}
                        className="p-[10px] text-black text-xl mb-5 rounded-md  bg-blue-300" >submit</button>
                    <button onClick={resetInput}
                        className="p-[10px] text-black text-xl  ml-5 mb-5 border rounded-md bg-red-300" >reset </button>

                </div>
            </div>

            {/* {3} */}
            <div className={` ${toggleState === 1 ? 'hidden' : ''} ${toggleState === 2 ? 'hidden' : ''}
          `}>
                <Reportproduct />
            </div>
        </div >
    );
}
export default Tabs;
