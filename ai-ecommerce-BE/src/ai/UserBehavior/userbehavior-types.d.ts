import { Schema } from 'mongoose';

export interface IUserBehavior extends Document {
    userId: string;
    productId: Schema.Types.ObjectId;
    action: 'view' | 'add_to_cart' | 'wishlist' | 'purchase' | 'review';
    timestamp: Date;
    metaData?: Record<string, any>;
}

