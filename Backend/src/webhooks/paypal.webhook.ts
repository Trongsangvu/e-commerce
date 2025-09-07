import { Request, Response } from "express";
import { Order } from "../models/Order";

export const paypalWebhook = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const event = req.body;

    if (event.type === "CHECKOUT .ORDER.APPROVED") {
      const orderId = event.resource.id;
      await Order.findOneAndUpdate({ paymentId: orderId }, { stauts: "paid" });
    }

    res.status(200).json({ message: "Webhook received" });
  } catch (error) {
    console.error("error:", error);
    res.status(400).json({ message: "Webhook processing failed" });
  }
};
