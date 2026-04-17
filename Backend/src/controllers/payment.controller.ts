import { CheckoutPaymentIntent } from "@paypal/paypal-server-sdk";
import { NextFunction, Request, Response } from "express";
import { ordersController } from "../integrations/paypal.service";
import stripe from "../integrations/stripe.service";
import { Order } from "../models/order.model";
import orderService from "../services/order.service";

export const checkoutPayment = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { orderId, method } = req.body;
    let response: object;

    const order = await orderService.findById(orderId);
    if (!order) {
      res.status(404).json({ error: "Order not found" });
      return;
    }

    const amount = Math.round(order.totalAmount * 100);
    if (isNaN(amount)) {
      res.status(400).json({ error: "Invalid totalAmount in order" });
      return;
    }

    const currency = "usd";

    switch (method) {
      case "stripe":
        const paymentIntent = await stripe.paymentIntents.create({
          amount,
          currency,
          payment_method_types: ["card"],
          metadata: { orderId: `${order._id}` },
        });

        await Order.findByIdAndUpdate(
          orderId,
          { $set: { stripePaymentId: paymentIntent.id } },
          { new: true },
        );

        response = { clientSecret: paymentIntent.client_secret };
        break;
      case "paypal":
        const paypalOrder = await ordersController.createOrder({
          body: {
            intent: CheckoutPaymentIntent.Capture,
            purchaseUnits: [
              {
                amount: {
                  currencyCode: "USD",
                  value: order.totalAmount.toFixed(2),
                },
              },
            ],
          },
        });

        const approveLink = paypalOrder.result.links?.find(
          (link: any) => link.rel === "approve",
        )?.href;

        await Order.findByIdAndUpdate(orderId, {
          $set: { paypalOrderId: paypalOrder.result.id },
        });

        response = {
          orderId: paypalOrder.result.id,
          approvalUrl: approveLink,
        };

        break;
      default:
        res.status(400).json({ error: "Invalid payment method" });
        return;
    }

    res.json(response);
  } catch (error) {
    console.error("Payment error:", error);
    res.status(500).json({ message: "Payment processing failed" });
  }
};

export const getStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { orderId } = req.params;
    const order = await orderService.findById(
      Array.isArray(orderId) ? orderId[0] : orderId,
    );

    if (!order) {
      res.status(404).json({ error: "Order not found" });
      return;
    }

    res.status(200).json({ status: order.status });
  } catch (error) {
    next(error);
  }
};
