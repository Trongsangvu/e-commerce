import { Schema } from "mongoose";

interface OrderItem {
  product: Schema.Types.ObjectId;
  quantity: number;
}

export interface IOrder {
  user: Schema.Types.ObjectId;
  products: OrderItem[];
  totalAmount: number;
  currency: "USD";
  status: string;
  paymentMethod: string;
  userFcmToken: string;
  userPhone: string;
}
