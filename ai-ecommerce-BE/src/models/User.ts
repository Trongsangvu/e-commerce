import { Schema, model } from 'mongoose';

interface Users extends Document {
    name: string;
    email: string;
    password: string;
    role?: "admin" | "user";
}

const userSchema = new Schema<Users>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ["admin", "user"], default: "user"}
    },
    {
        timestamps: true
    }
);

export const User = model<Users>("User", userSchema);
