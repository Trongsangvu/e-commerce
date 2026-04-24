import { HydratedDocument, model } from "mongoose";
import { ProductCategory } from "../configs/enum";
import { IProduct } from "../types/product-types";
import { computeProductBadges } from "../utils/badge.util";
import formatCurrency from "../utils/currency.util";
import { baseSchema } from "./base.model";

const productSchema = baseSchema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: "USD",
      required: false,
    },
    category: {
      type: String,
      enum: Object.values(ProductCategory),
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    image_url: {
      type: String,
      required: false,
    },
    tags: {
      type: [String],
      default: [],
      required: false,
    },
  },
  {
    toJSON: {
      transform(_doc, ret: any) {
        ret.formattedPrice = formatCurrency(ret.price, ret.currency);
        ret.badges = computeProductBadges(ret);
        return ret;
      },
    },
  },
);

export const Product = model<IProduct>("Product", productSchema);
export type ProductDocument = HydratedDocument<IProduct>;
