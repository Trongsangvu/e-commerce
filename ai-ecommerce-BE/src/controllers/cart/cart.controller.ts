import { Request, Response, NextFunction } from "express";
import { Cart } from "../../models/Cart";
import { RedisService } from "../../services/redis.service";

export const getCart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.user?.id;

        const cacheKey = `cart: ${userId}`;
        let cachedCart;

        try {
            cachedCart = await RedisService.get(cacheKey);

        } catch(err) {
            console.warn('Redis cache fetch failed, falling back to database', err);
        }

        if(cachedCart) {
            res.status(200).json(JSON.parse(cachedCart));
            return;
        }

        const cart = await Cart.findOne({ userId }).populate("items.productId");
        if(!cart){
            res.status(200).json({ items: [] });
            return;
        }

        await RedisService.set(`cart: ${userId}`, JSON.stringify(cart), 3600);
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

        try {
            await RedisService.del(`cart:${userId}`);
        } catch(error) {
            console.log('Redis cache deletion falied:', error);
        }

        res.status(200).json({ message: "Product added to cart successfully", cart });
    }
    catch(error) {
        next(error);
    }
}
