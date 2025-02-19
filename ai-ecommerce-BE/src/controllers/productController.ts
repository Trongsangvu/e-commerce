import { Product } from "../models/Product";
import { Request, Response, NextFunction } from "express";


export const getProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const product = await Product.find({});
        res.status(200).json(product);
    }
    catch(err) {
        next(err);
    }
}

export const getProductById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        res.status(200).json(product);
    }
    catch(err) {
        next(err);
    }
}

export const createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    }
    catch(err) {
        next(err);
    }
}

export const updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true });

        if(!product) {
            res.status(404).json({ message: "Product not found" });
        }
        
        res.status(201).json(product);
    }
    catch(err) {
        next(err);
    }
} 

