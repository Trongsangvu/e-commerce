
import { Product } from '../../models/Product';
import { NextFunction, Request, Response } from 'express';

export const searchProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const keyword = req.query.name;

        if(!keyword) {
            res.status(400).json({ message: 'Missing search keyword'})
        }

        const products = await Product.find({
            name: { $regex: keyword, $options: "i" }
        });

        res.json(products);
    }
    catch (err) {
        console.error("Lỗi API tìm kiếm:", err);
        next(err);
    }
}    