import { Schema } from "mongoose";

export interface RefreshToken extends Document {
  token: string;
  user: Schema.Types.ObjectId;
  expiresAt: Date;
  isRevoked: boolean;
  family: string;
}
