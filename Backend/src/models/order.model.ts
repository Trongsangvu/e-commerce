import { Schema, model } from "mongoose";
import { PaymentMethod, PaymentStatus } from "../configs/enum";
import { Orders } from "../types/order-types";
import formatCurrency from "../utils/currency.util";
import { baseSchema } from "./base.model";

const orderSchema = baseSchema<Orders>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    currency: { type: String, default: "USD" },
    status: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.PENDING,
    },
    paymentMethod: {
      type: String,
      enum: Object.values(PaymentMethod),
      required: true,
    },
    userFcmToken: { type: String },
    userPhone: { type: String },
  },
  {
    toJSON: {
      transform: (_doc, ret: any) => {
        ret.formattedTotalAmount = formatCurrency(ret.totalAmount, ret.currency);
        return ret;
      },
    },
  },
);

export const Order = model<Orders>("Order", orderSchema);
