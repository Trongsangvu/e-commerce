import { Schema, model } from "mongoose";
import { Products } from "../types/product/product-types";

const productSchema = new Schema<Products>(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true, min: 0 },
        currency: { type: String, default: "USD" },
        category: { type: String, enum: ["men", "women"] },
        description: { type: String },
        imageUrl: { type: String, required: true },
    },
    {
        timestamps: true,
        toJSON: {
            transform: (_doc, ret) => {
                const currencySybl: Record<string, string> = {
                    USD: "$"
                }
                const symbol = currencySybl[ret.currency];
                ret.price = `${symbol}${ret.price.toFixed(2)}`;
                return ret;
            }
        }
    }
);

const Product = model<Products>("Product", productSchema);
export { Product };

