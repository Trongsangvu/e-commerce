import mongoose from "mongoose";

interface CartItem {
  productId: mongoose.Types.ObjectId;
  quantity: number;
}

export interface Carts extends Document {
  userId: mongoose.Types.ObjectId;
  items: CartItem[];
}
