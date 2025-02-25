import mongoose, { Schema, model } from 'mongoose';
import { Orders } from '../types/order/order-types';

const orderSchema = new Schema<Orders>(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        products: [
            {
                productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
                quantity: { type: Number, required: true }
            }
        ],
        totalAmount: { type: Number, required: true },
        status: {
            type: String,
            enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
            default: 'pending'
        },
        paymentMethod: {
            type: String,
            enum: ['cash', 'credit_card', 'paypal'],
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const Order = model<Orders>('Order', orderSchema);