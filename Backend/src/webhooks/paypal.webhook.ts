import { Request, Response } from "express";
import { Order } from "../models/order.model";
import { ApiResponse } from "../configs/response";
import { messagePayment } from "../configs/messages";

export const paypalWebhook = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const event = req.body;

    if (event.type === "CHECKOUT .ORDER.APPROVED") {
      const orderId = event.resource.id;
      await Order.findOneAndUpdate({ paymentId: orderId }, { status: "paid" });
    }

    ApiResponse.OK(res, { received: true });
  } catch {
    ApiResponse.BadRequest(res, messagePayment.WEBHOOK_FAILED);
  }
};
