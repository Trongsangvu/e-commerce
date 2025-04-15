export interface Users extends Document {
    name: string;
    email: string;
    password: string;
    role?: "admin" | "user";
    appwriteId?: string;
}