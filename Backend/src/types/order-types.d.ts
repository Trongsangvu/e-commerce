import mongoose from "mongoose";

interface Order {
  productId: mongoose.Schema.Types.ObjectId;
  quantity: number;
}

export interface Orders extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  products: Order[];
  totalAmount: number;
  currency: "USD";
  status: string;
  paymentMethod: string;
  userFcmToken: string;
  userPhone: string;
}
