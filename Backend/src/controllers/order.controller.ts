import { Request, Response } from "express";
import redisClient from "../configs/redis";
import { Order } from "../models/order.model";
import { sendPushNotification } from "../services/firebase.service";
// import { sendOrderNotification } from '../services/twilio.service';
import {
  messageInvalid,
  messageNotFound,
  messageOrder,
} from "../configs/messages";
import { ApiResponse } from "../configs/response";
import { sendOrderToWarehouse } from "../services/kafka.service";
import orderService from "../services/order.service";
import { RedisService } from "../services/redis.service";
import { calculateTotalAmount } from "../utils/calculate-total.util";

export const getOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const cacheKey = `orders:${userId}`;
    const cachedOrders = await redisClient.get(cacheKey);

    if (cachedOrders) {
      ApiResponse.OK(res, {
        message: messageOrder.ORDER_RETRIEVED,
        orders: JSON.parse(cachedOrders),
      });
      return;
    }

    // If not have cache, query from DB
    const orders = await orderService.findById(userId!);
    if (!orders) {
      ApiResponse.NotFound(res, messageNotFound("Orders"));
      return;
    }

    redisClient.setEx(cacheKey, 3600, JSON.stringify(orders));

    ApiResponse.OK(res, { orders });
  } catch (error) {
    ApiResponse.InternalServerError(res, error);
  }
};

export const createOrders = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { products, paymentMethod } = req.body;
    // const { products, paymentMethod, userFcmToken, userPhone } = req.body;
    const userId = req.user?.id;

    if (!products || products.length === 0) {
      ApiResponse.BadRequest(res, messageOrder.NO_PRODUCTS);
      return;
    }

    const totalAmount = await calculateTotalAmount(products);

    if (isNaN(totalAmount) || totalAmount <= 0) {
      ApiResponse.BadRequest(res, messageInvalid("Total amount"));
      return;
    }

    // create new order
    const newOrder = new Order({
      userId,
      products,
      totalAmount,
      paymentMethod,
      status: "pending",
    });

    await newOrder.save();
    const cacheKey = `orders:${userId}`;
    redisClient.del(cacheKey); // delete cache to update new data

    await Promise.all([
      // userFcmToken && sendPushNotification(userFcmToken, "New order", " Order placed successfully"),// if we have userFcmToken send message success
      // userPhone && sendOrderNotification(userPhone, `Your order #${newOrder._id} has been placed successfully`),// Send SMS notification if userPhone exists
      sendOrderToWarehouse(newOrder), // Send order to warehouse system via Kafka
    ]);

    ApiResponse.Created(res, {
      message: messageOrder.PLACED_SUCCESS,
      order: newOrder,
    });
  } catch (error) {
    ApiResponse.InternalServerError(res, error);
  }
};

export const updateOrders = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const order = await orderService.updateById(
      Array.isArray(id) ? id[0] : id,
      req.body,
    );
    if (!order) {
      ApiResponse.NotFound(res, messageNotFound("Order"));
      return;
    }

    const cacheKey = `orders:${userId}`;

    await Promise.all([
      await RedisService.del(cacheKey),
      // await sendPushNotification(req.body.userFcmToken, "update order", `Your order status ${req.body.status}`),
      // await sendOrderNotification(req.body.userPhone, "Your order has been placed successfully!")
    ]);

    ApiResponse.OK(res, {
      message: messageOrder.ORDER_UPDATED,
      order,
    });
  } catch (error) {
    ApiResponse.InternalServerError(res, error);
  }
};

export const updateOrderStatus = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const { status } = req.body;

    const order = await orderService.updateStatus(
      Array.isArray(id) ? id[0] : id,
      status,
    );

    if (!order) {
      ApiResponse.NotFound(res, messageNotFound("Order"));
      return;
    }

    // io.emit('orderUpdated', order);

    const cacheKey = `orders:${userId}`;
    await Promise.all([
      await RedisService.del(cacheKey),
      await sendPushNotification(
        req.body.userFcmToken,
        "Update order status",
        `Your order status ${status}`,
      ),
    ]);

    ApiResponse.OK(res, {
      message: messageOrder.ORDER_UPDATED,
      order,
    });
  } catch (error) {
    ApiResponse.InternalServerError(res, error);
  }
};
