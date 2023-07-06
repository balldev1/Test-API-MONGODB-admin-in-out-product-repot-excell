import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // {GET}
    try {
        if (req.method !== 'GET') {
            return res.status(405).end();
        }

        // const { userId } = req.query;

        const { date, time, outamount, amount, remark } = req.body;

        const inProducts = await prismadb.outProduct.findMany({
            where: {
                userId: '64a3ddde4beb4ee40a1dc691'
            },
        });

        return res.status(200).json(inProducts);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred' });
    }
}