import { Request, Response, NextFunction } from "express";
import { Cart } from "../../models/Cart";
import { RedisService } from "../../services/redis.service";
import mongoose from 'mongoose';

export const getCart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.user?.id;

        const cacheKey = `cart:${userId}`;
        let cachedCart;

        try {
            cachedCart = await RedisService.get(cacheKey);

        } catch(err) {
            console.log('Redis cache fetch failed, falling back to database', err);
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

        await RedisService.set(`cart:${userId}`, JSON.stringify(cart), 3600);
        res.status(200).json(cart);
    }
    catch(error) {
        next(error);
    }
}

export const updateCart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
   try {
        const { productId } = req.params;
        const { quantity } = req.body;
        const userId = req.user?.id;

        // Check out productId is valid
        if(!mongoose.Types.ObjectId.isValid(productId)) {
            res.status(400).json({ message: "Invalid product ID" });
            return;
        }

        // Check out quantity is valid
        if(quantity === undefined || quantity <= 0) {
            res.status(400).json({ message: "Quantity must be greater than 0" });
            return;
        }

        // // Check out user's cart
        // const cart = await Cart.findOne({ userId });
        // if(!cart) {
        //     res.status(404).json({ message: "Cart not found" });
        //     return;
        // }

        // // Find the item index in the cart - does it exist?
        // const itemIndex = cart.items.findIndex(
        //     item => item.productId.toString() === productId
        // );

        // if (itemIndex === -1) {
        //     res.status(404).json({ message: "Product not found in cart" });
        //     return;
        // }

        // // Update the quantity directly
        // cart.items[itemIndex].quantity = quantity;
        // await cart.save();


        // const updatedCart = await Cart.findOne({ userId }).populate("items.productId");

        const updatedCart = await Cart.findOneAndUpdate(
            { userId, "items.productId": productId },
            { $set: { "items.$.quantity": quantity }},
            { new: true }
        );

        if (!updatedCart) {
            res.status(404).json({ message: "Cart or product not found" });
            return; 
        }

        // Clear Redis cache
        try {
            await RedisService.del(`cart:${userId}`);
        } catch(error) {
            console.log('Redis cache deletion failed:', error);
        }

        res.status(200).json({ message: "Cart updated successfully", cart: updatedCart });
   } catch(error) {
    next(error);
   }
}

export const addToCart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user?.id;

        // Validate required fields
        if (!productId || !quantity) {
            res.status(400).json({ message: "ProductId and quantity are required" });
            return;
        }

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
export const removeFromCart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        console.log("req.params:", req.params); // Debug
        const userId = req.user?.id; // User's token
        const { productId } = req.params; // product's id

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            res.status(400).json({ message: "Invalid product ID" });
            return;
        }

        const cart = await Cart.findOneAndUpdate(
            { userId }, // Tìm giỏ hàng của user
            { $pull: { items: { productId: new mongoose.Types.ObjectId(productId) } } }, // Xóa sản phẩm khỏi giỏ hàng
            { new: true } // Trả về giỏ hàng sau khi cập nhật
        );

        if(!cart) {
            res.status(404).json({ message: "Cart not found" });
            return;
        }

        try {
            await RedisService.del(`cart:${userId}`);
        }
        catch(error) {
            console.log("Redis cache delete failed", error);
        }

        res.status(200).json({ message: "Product removed from cart successfully", cart });
    }
    catch(error) {
        next(error);
    }
}