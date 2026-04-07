import { Schema } from "mongoose";

interface CartItem {
  product: Schema.Types.ObjectId;
  quantity: number;
}

export interface Carts extends Document {
  user: Schema.Types.ObjectId;
  items: CartItem[];
}
