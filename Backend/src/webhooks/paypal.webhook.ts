import { Request, Response } from "express";
import { Order } from "../models/order.model";
import { ApiResponse } from "../configs/response";
import { messagePayment } from "../configs/messages";
import { PaymentStatus } from "../configs/enum";

export const paypalWebhook = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const event = req.body;

    if (event.type === "CHECKOUT.ORDER.APPROVED") {
      const orderId = event.resource.id;
      const order = await Order.findOneAndUpdate(
        { paymentId: orderId },
        { status: PaymentStatus.PAID },
      );

      if (!order) {
        console.log("Order not found:", orderId);
      }
    }

    ApiResponse.OK(res, { received: true });
  } catch {
    ApiResponse.BadRequest(res, messagePayment.WEBHOOK_FAILED);
  }
};
