export interface Users extends Document {
  name: string;
  email: string;
  password: string;
  salt: string;
  role: "admin" | "user";
  appWriteId?: string;
  reset_password_token?: string;
}
