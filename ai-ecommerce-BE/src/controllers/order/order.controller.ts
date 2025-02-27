import { Request, Response, NextFunction } from 'express';
import { Order } from '../../models/Order';
import redisClient from '../../config/redis';
import { sendPushNotification } from '../../services/firebase.service';
import { sendOrderNotification } from '../../services/twilio.service';
import { sendOrderToWarehouse } from '../../services/kafka.service';


export const getOrders = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.user?.id;
        const cacheKey = `orders:${userId}`;
        const cachedOrders = await redisClient.get(cacheKey);

        if(cachedOrders) {
            res.status(200).json(JSON.parse(cachedOrders))
            return;
        }

        // If not have cache, query from DB
        const orders = await Order.find({ userId }).sort({ createdAt: -1 });
        redisClient.setEx(cacheKey, 3600, JSON.stringify(orders));

        res.status(200).json(orders);
    }
    catch(error) {
        next(error);
    }
}

export const createOrders = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { products, totalAmount, paymentMethod, userFcmToken, userPhone } = req.body;
        const userId = req.user?.id;

        if (!products || products.length === 0) {
            res.status(400).json({ message: 'No Products in order' });
            return;
        }

        // create new order
        const newOrder = new Order({
            userId,
            products,
            totalAmount,
            paymentMethod,
            status: 'pending'
        });

        await newOrder.save();
        const cacheKey = `orders:${userId}`;
        redisClient.del(cacheKey); // delete cache to update new data

        // if we have userFcmToken send message success
        if(userFcmToken) {
            await sendPushNotification(userFcmToken, "New Order", "Order placed successfully");
        }

        // Send SMS notification if userPhone exists
        if (userPhone) {
            await sendOrderNotification(userPhone, `Your order #${newOrder._id} has been placed successfully.`);
        }

        // Send order to warehouse system via Kafka
        await sendOrderToWarehouse(newOrder);

        res.status(201).json({ message: "Order placed successfully", order: newOrder});
    }
    catch(error) {
        next(error);
    }
}

export const updateOrders = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;

        const order = await Order.findByIdAndUpdate(id, req.body);
        if(!order) {
            res.status(404).json({ message: "Order not found" });
            return;
        }
        await order.save();

        // if(req.body.userFcmToken) {
        //     await sendPushNotification(req.body.userFcmToken, "update order", `Your order status ${req.body.status}`)
        // }

        if(req.body.userPhone){
            await sendOrderNotification(req.body.userPhone, "Your order has been placed successfully!");
        }
        res.status(200).json({ message: "Order updated successfully", order });
    }
    catch(error) {
        next(error);
    }
}

export const updateOrderStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const order = await Order.findById(id);

        if(!order) {
            res.status(404).json({ message: "Order not found" });
            return
        }

        order.status = status;
        await order.save()

        if(req.body.userFcmToken) {
            await sendPushNotification(req.body.userFcmToken, "Update order status", `Your order status ${status}`);
        }
        res.status(200).json({ message: "Order status updated successfully", order });
    }
    catch(error) {
        next(error);
    }

}