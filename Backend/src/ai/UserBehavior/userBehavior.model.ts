import { Schema, model } from 'mongoose';
import { IUserBehavior } from './userbehavior-types';

const userBehaviorSchema = new Schema<IUserBehavior>({
    userId: { type: String, ref: 'product', required: true, index: true },
    productId: { type: Schema.Types.ObjectId, ref: 'product', required: true, index: true },
    action: { type: String, enum: ['view', 'add_to_cart', 'wishlist', 'purchase', 'review'], required: true },
    timestamp: { type: Date, default: Date.now, index: true },
    metaData: { type: Schema.Types.Mixed, default: {} },
},
    {
        timestamps: true
    }
);

export const UserBehavior = model<IUserBehavior>('UserBehavior', userBehaviorSchema);