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
        currency: { type: String, default: "USD" },
        status: {
            type: String,
            enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
            default: 'pending'
        },
        paymentMethod: {
            type: String,
            enum: ['cash', 'card', 'paypal', 'stripe'],
            required: true
        },
        userFcmToken: { type: String },
        userPhone: { type: String }
    },
    {
        timestamps: true,
        toJSON: {
            transform: (_doc, ret) => {
                const currencySybl: Record<string, string> = {
                    USD: "$"
                }
                const symbol = currencySybl[ret.currency] || "";

                if(typeof ret.totalAmount !== 'number') {
                    ret.totalAmount = 'Invalid Amount';
                } else {
                    ret.totalAmount = `${symbol}${ret.totalAmount.toFixed(2)}`;
                }

                return ret;
            }
        }
    }
);

export const Order = model<Orders>('Order', orderSchema);