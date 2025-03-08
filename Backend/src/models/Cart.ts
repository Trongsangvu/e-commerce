import mongoose, { Schema, model } from "mongoose";
import { Carts } from "../types/cart/cart-types";

const cartSchema = new Schema<Carts>(
    {
        userId: { type: mongoose.Schema.Types.ObjectId },
        items: [
            {
                productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
                quantity: { type: Number, required: true, min: 1 }
            }
        ],
    },
    {
        timestamps: true
    }
)

export const Cart = model<Carts>("Cart", cartSchema);