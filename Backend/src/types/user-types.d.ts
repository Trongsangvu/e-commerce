export interface IUser {
  name: string;
  email: string;
  password: string;
  salt?: string;
  role: "admin" | "user";
  appWriteId: string;
  reset_password_token?: string;
  created_by?: string;
}