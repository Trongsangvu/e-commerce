import { Request, Response } from "express";
import {
  messageCart,
  messageDeleted,
  messageInvalid,
  messageNotFound,
} from "../configs/messages";
import { ApiResponse } from "../configs/response";
import { RedisService } from "../integrations/redis.service";
import cartService from "../services/cart.service";
import { RemoveFromCartRequest } from "../requests/cart.request";

const getCart = async (req: Request, res: Response): Promise<void> => {
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
    ApiResponse.OK(res, cart);
  } catch (error) {
    ApiResponse.InternalServerError(res, error);
  }
};

const updateCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params as { id: string };
    const { quantity } = req.body;
    const userId = req.user?.id;

    // Check out quantity is valid
    if (quantity === undefined || quantity <= 0) {
      ApiResponse.BadRequest(res, messageInvalid("Quantity"));
      return;
    }

    // operator $set update specific item in the array
    const updatedCart = await cartService.update(userId, id, quantity);

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

const addToCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { product, quantity } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      ApiResponse.Unauthorized(res, messageNotFound("User"));
      return;
    }

    const updatedCart = await cartService.add(userId, product, quantity);

    // clear cache (non-blocking)
    RedisService.del(`cart:${userId}`).catch((err) => {
      console.error("Redis cache deletion failed:", err);
    });

    ApiResponse.OK(res, {
      message: messageCart.CART_ADD_SUCCESS,
      cart: updatedCart,
    });
  } catch (error) {
    ApiResponse.InternalServerError(res, error);
  }
};

const removeFromCart = async (
  req: RemoveFromCartRequest,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    if (!userId) {
      ApiResponse.Unauthorized(res, messageNotFound("User"));
      return;
    }

    const cart = await cartService.remove(userId, id);

    if (!cart) {
      ApiResponse.NotFound(res, messageNotFound("Cart"));
      return;
    }

    // clear cache (non-blocking)
    RedisService.del(`cart:${userId}`).catch((err) => {
      console.error("Redis cache deletion failed:", err);
    });

    ApiResponse.OK(res, {
      message: messageDeleted("Product"),
      cart,
    });
  } catch (error) {
    ApiResponse.InternalServerError(res, error);
  }
};

export default {
  getCart,
  updateCart,
  addToCart,
  removeFromCart,
};
