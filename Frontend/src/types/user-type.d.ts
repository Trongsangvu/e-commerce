export interface User {
  id: string;
  role: "USER" | "ADMIN";
  email?: string;
}
