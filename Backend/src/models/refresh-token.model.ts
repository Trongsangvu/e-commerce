import { Schema, model } from "mongoose";
import { RefreshToken } from "../types/refreshToken-types";
import { baseSchema } from "./base.model";

const refreshTokenSchema = baseSchema<RefreshToken>({
  token: { type: String, required: true, unique: true },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  expiresAt: { type: Date, required: true },
  isRevoked: { type: Boolean, default: false },
  family: { type: String, required: true },
});

export const RefreshTokenModel = model<RefreshToken>(
  "RefreshToken",
  refreshTokenSchema,
);
