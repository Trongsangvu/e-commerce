import mongoose, { Schema, model } from "mongoose";
import { RefreshToken } from '../types/token/refreshToken-types';

const refreshTokenSchema = new Schema<RefreshToken>(
    {
        token: { type: String, required: true, unique: true },
        userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
        expiresAt: { type: Date, required: true },
        isRevoked: { type: Boolean, default: false },
        family: { type: String, required: true },
    },
    {
        timestamps: true
    }
);

export const RefreshTokenModel = model<RefreshToken>('RefreshToken', refreshTokenSchema);