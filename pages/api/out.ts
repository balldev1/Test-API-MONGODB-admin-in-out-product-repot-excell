import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // {POST}
    try {
        if (req.method !== 'POST') {
            return res.status(405).end();
        }

        const { date, time, product, outamount, remark } = req.body;



        const createdProduct = await prismadb.outProduct.create({
            data: {
                date: new Date,
                time: new Date,
                product,
                outamount: parseInt(outamount), // แปลงค่า amount เป็นประเภท Int
                remark,
                userId: '64a3ddde4beb4ee40a1dc691'
            }
        });


        return res.status(200).json(createdProduct);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred' });
    }
}