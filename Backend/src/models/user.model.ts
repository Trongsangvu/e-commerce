import { model } from "mongoose";
import { UserRole } from "../configs/enum";
import { Users } from "../types/user-types";
import { baseSchema } from "./base.model";

const userSchema = baseSchema<Users>(
  {
    appWriteId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    reset_password_token: { type: String, select: false },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
  },
);

export const User = model<Users>("User", userSchema);
