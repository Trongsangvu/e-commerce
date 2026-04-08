import { Schema } from "mongoose";

export interface IRefreshToken {
  token: string;
  user: Schema.Types.ObjectId;
  expiresAt: Date;
  isRevoked: boolean;
  family: string;
}
