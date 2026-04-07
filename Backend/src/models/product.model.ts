import { model } from "mongoose";
import { ProductCategory } from "../configs/enum";
import { Products } from "../types/product-types";
import { baseSchema } from "./base.model";
import formatCurrency from "../utils/currency.util";

const productSchema = baseSchema<Products>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    currency: { type: String, default: "USD" },
    category: { type: String, enum: ProductCategory },
    description: { type: String },
    imageUrl: { type: String, required: true },
    tags: { type: String },
  },
  {
    toJSON: {
      transform(_doc, ret: any) {
        ret.formattedPrice = formatCurrency(ret.price, ret.currency);
        return ret;
      },
    },
  },
);

export const Product = model<Products>("Product", productSchema);
