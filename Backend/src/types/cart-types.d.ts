import { Schema } from "mongoose";

interface CartItem {
  product: Schema.Types.ObjectId;
  quantity: number;
}

export interface ICart {
  user: Schema.Types.ObjectId;
  items: CartItem[];
}
