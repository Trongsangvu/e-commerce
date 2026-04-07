import { JwtPayload } from "jsonwebtoken";

export interface UserPayload extends JwtPayload {
  role: string;
  sub: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload | any;
      rawBody?: Buffer;
    }
  }
}

export {};
