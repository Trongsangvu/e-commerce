import { Types } from "mongoose";

export interface IRefreshToken {
  token: string;
  user: Types.ObjectId;
  expiresAt: Date;
  isRevoked: boolean;
  family: string;
}
