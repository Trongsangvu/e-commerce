import { Types } from "mongoose";

interface OrderItem {
  product: Types.ObjectId;
  quantity: number;
}

export interface IOrder {
  user: Types.ObjectId;
  products: OrderItem[];
  totalAmount: number;
  currency: "USD";
  status: string;
  paymentMethod: string;
  userFcmToken: string;
  userPhone: string;
}
