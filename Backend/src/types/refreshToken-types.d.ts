import mongoose from "mongoose";

export interface RefreshToken extends Document {
  token: string;
  userId: mongoose.Schema.Types.ObjectId;
  expiresAt: Date;
  isRevoked: boolean;
  family: string;
}
