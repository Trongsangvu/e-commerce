import { Schema, model } from "mongoose";
import { Carts } from "../types/cart-types";
import { baseSchema } from "./base.model";

const cartSchema = baseSchema<Carts>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  items: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true, min: 1 },
    },
  ],
});

export const Cart = model<Carts>("Cart", cartSchema);
