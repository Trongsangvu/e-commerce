import { Request, Response } from "express";
import { messagePayment } from "../configs/messages";
import { ApiResponse } from "../configs/response";
import stripe from "../configs/stripe";
import { Order } from "../models/order.model";
import { RedisService } from "../services/redis.service";

export const stripeWebhook = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const sig = req.headers["stripe-signature"];

  if (!sig) {
    res
      .status(400)
      .send("Webhook Error: No stripe-signature header value was provided.");
    return;
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  try {
    const event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object;

      const order = await Order.findOne({ stripePaymentId: paymentIntent.id });
      if (!order) {
        ApiResponse.BadRequest(res, messagePayment.NO_MATCHING_ORDER);
        return;
      }

      const orderId = paymentIntent.metadata?.orderId?.toString();

      await Order.findByIdAndUpdate(
        orderId,
        { $set: { status: "paid", stripePaymentId: paymentIntent.id } },
        { new: true },
      );

      const cacheKey = `order:${order.user.toString()}`;
      await RedisService.del(cacheKey);
    }

    res.json({ received: true });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    res.status(400).send(`Webhook Error: ${errorMessage}`);
  }
};
