import { Schema, model } from "mongoose";
import { Users } from "../types/user/user-types";

const userSchema = new Schema<Users>(
  {
    appwriteId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
  },
  {
    timestamps: true,
  }
);

export const User = model<Users>("User", userSchema);
