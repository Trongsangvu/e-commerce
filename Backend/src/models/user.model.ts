import { model, HydratedDocument, Schema } from "mongoose";
import { UserRole } from "../configs/enum";
import { IUser } from "../types/user-types";
import { baseSchema } from "./base.model";

const userSchema = baseSchema<IUser>({
  appWriteId: {
    type: String,
    required: false,
    unique: true,
    sparse: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  salt: {
    type: String,
    select: false,
  },
  reset_password_token: {
    type: String,
    select: false,
  },
  role: {
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.USER,
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
});

export const User = model<IUser>("User", userSchema);
export type UserDocument = HydratedDocument<IUser>;
