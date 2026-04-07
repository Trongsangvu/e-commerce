import { Schema } from "mongoose";

interface Order {
  product: Schema.Types.ObjectId;
  quantity: number;
}

export interface Orders extends Document {
  user: Schema.Types.ObjectId;
  products: Order[];
  totalAmount: number;
  currency: "USD";
  status: string;
  paymentMethod: string;
  userFcmToken: string;
  userPhone: string;
}
