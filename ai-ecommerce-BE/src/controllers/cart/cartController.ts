import { Request, Response, NextFunction } from "express";
import { Cart } from "../../models/Cart";
import redisClient from "../../config/redis";

export const getCart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.user?.id;
        const cachedCart = await redisClient.get(`cart:${userId}`);
        if(cachedCart) {
            res.status(200).json(JSON.parse(cachedCart));
            return;
        }

        const cart = await Cart.findOne({ userId }).populate("items.productId");
        if(!cart){
            res.status(200).json({ items: [] });
            return;
        }

        await redisClient.setEx(`cart: ${userId}`, 3600, JSON.stringify(cart));
        res.status(200).json(cart);
    }
    catch(error) {
        next(error);
    }
}

export const addToCart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user?.id;

        let cart = await Cart.findOne({ userId });
        if(!cart) {
            cart = new Cart({ userId, items: [] });
        }

        const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
        if(itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }

        await cart.save();
        await redisClient.del(`cart:${userId}`);
        res.status(200).json({ message: "Product added to cart successfully" });
    }
    catch(error) {
        next(error);
    }
}
