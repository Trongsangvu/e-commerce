import { Request, Response } from 'express';
import stripe from '../config/payment/stripe';
import { Order } from '../models/Order';
import { RedisService } from "../services/redis.service";


export const stripeWebhook = async (req: Request, res: Response): Promise<void> => {
    const sig = req.headers['stripe-signature'];

    if(!sig) {
        res.status(400).send("Webhook Error: No stripe-signature header value was provided.");
        return;
    }

    const webhookSeret = process.env.STRIPE_WEBHOOK_SECRET!;
    try {
        const event = stripe.webhooks.constructEvent(req.body, sig, webhookSeret);

        if (event.type === 'payment_intent.succeeded') {
            const paymentIntent = event.data.object;
            console.log("Received paymentIntent ID:", paymentIntent.id);
            console.log("Metadata received:", paymentIntent.metadata);
            // console.log("PaymentIntent Status:", paymentIntent.status);

            const order = await Order.findOne({ stripePaymentId: paymentIntent.id });
            if (!order) {
                console.error("No order found for PaymentIntent:", paymentIntent.id);
                res.status(400).json({ error: "No matching order found" });
                return;
            }

            const orderId = paymentIntent.metadata?.orderId?.toString();

            await Order.findByIdAndUpdate(
                orderId,
                { $set: { status: 'paid', stripePaymentId: paymentIntent.id }},
                { new: true }
            );

            const cacheKey = `order:${order.userId}`;
            await RedisService.del(cacheKey);
            console.log("Cache cleared for key:", cacheKey);
        }

        res.json({ received: true });
    }
    catch(error) {
        console.error("Webhook Signature Verification Failed:", error.message);
        res.status(400).send(`Webhook Error: ${error.message}`);
    }
}