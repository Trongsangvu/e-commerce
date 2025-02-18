import { Schema, model } from "mongoose";
interface Products extends Document {
    name: string;
    price: number;
    description: string;
    image: string;
}

const productSchema = new Schema<Products>(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
    },
    {
        timestamps: true
    }
);

const Product = model<Products>("Product", productSchema);
export { Product };

