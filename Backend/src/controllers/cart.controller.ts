import { Request, Response } from "express";
import mongoose from "mongoose";
import {
  messageCart,
  messageDeleted,
  messageInvalid,
  messageNotFound,
  messageRequired,
} from "../configs/messages";
import { ApiResponse } from "../configs/response";
import { RedisService } from "../integrations/redis.service";
import { Cart } from "../models/cart.model";
import cartService from "../services/cart.service";

export const getCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;

    const cacheKey = `cart:${userId}`;
    let cachedCart: string | null = null;

    try {
      cachedCart = await RedisService.get(cacheKey);
    } catch (err) {
      console.log("Redis cache fetch failed, falling back to database", err);
    }

    if (cachedCart) {
      res.status(200).json(JSON.parse(cachedCart));
      return;
    }

    const cart = await cartService.findOne(userId);
    if (!cart) {
      res.status(200).json({ items: [] });
      return;
    }

    await RedisService.set(`cart:${userId}`, JSON.stringify(cart), 3600);
    res.status(200).json(cart);
  } catch (error) {
    ApiResponse.InternalServerError(res, error);
  }
};

export const updateCart = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const userId = req.user?.id;

    // Check out productId is valid
    if (
      typeof productId !== "string" ||
      !mongoose.Types.ObjectId.isValid(productId)
    ) {
      ApiResponse.BadRequest(res, messageInvalid("Product ID"));
      return;
    }

    // Check out quantity is valid
    if (quantity === undefined || quantity <= 0) {
      ApiResponse.BadRequest(res, messageInvalid("Quantity"));
      return;
    }

    // operator $set update specific item in the array
    const updatedCart = await cartService.update(userId, productId, quantity);

    if (!updatedCart) {
      ApiResponse.NotFound(res, messageNotFound("Cart"));
      return;
    }

    // Clear Redis cache
    try {
      await RedisService.del(`cart:${userId}`);
    } catch (error) {
      console.log("Redis cache deletion failed:", error);
    }

    ApiResponse.OK(res, {
      message: messageCart.CART_UPDATED,
      cart: updatedCart,
    });
  } catch (error) {
    ApiResponse.InternalServerError(res, error);
  }
};

export const addToCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { product, quantity } = req.body;
    const userId = req.user?.id;

    // Validate required fields
    if (!product || !quantity) {
      ApiResponse.BadRequest(res, messageRequired("Product ID and Quantity"));
      return;
    }

    let cart = await cartService.findOne(userId);
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === product,
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product, quantity });
    }

    await cart.save();

    try {
      await RedisService.del(`cart:${userId}`);
    } catch (error) {
      console.log("Redis cache deletion failed:", error);
    }

    ApiResponse.OK(res, {
      message: messageCart.CART_ADD_SUCCESS,
      cart,
    });
  } catch (error) {
    ApiResponse.InternalServerError(res, error);
  }
};
export const removeFromCart = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { productId } = req.params;

    if (
      typeof productId !== "string" ||
      !mongoose.Types.ObjectId.isValid(productId)
    ) {
      ApiResponse.BadRequest(res, messageInvalid("Product ID"));
      return;
    }

    const cart = await cartService.remove(userId, productId);

    if (!cart) {
      ApiResponse.NotFound(res, messageNotFound("Cart"));
      return;
    }

    try {
      await RedisService.del(`cart:${userId}`);
    } catch (error) {
      console.log("Redis cache delete failed", error);
    }

    ApiResponse.OK(res, {
      message: messageDeleted("Product"),
      cart,
    });
  } catch (error) {
    ApiResponse.InternalServerError(res, error);
  }
};
