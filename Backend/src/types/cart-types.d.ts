import { Types } from "mongoose";

interface CartItem<T = Types.ObjectId> {
  product: T;
  quantity: number;
}

export interface ICart {
  user: Types.ObjectId;
  items: CartItem<T>[];
}
