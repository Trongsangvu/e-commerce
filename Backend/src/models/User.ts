import { Schema, model } from "mongoose";
import { Users } from "../types/user-types";
import { UserRole } from "../config/enum";

const userSchema = new Schema<Users>(
  {
    appWriteId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt: { type: String, select: false },
    reset_password_token: { type: String, select: false },
    role: { type: String, enum: UserRole, default: "user" },
  },
  {
    timestamps: true,
  },
);

export const User = model<Users>("User", userSchema);
