import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.header("authorization");
  const cookieToken = req.cookies?.token;

  // const token = req.header("authorization");
  const token = authHeader?.replace("Bearer ", "") || cookieToken;

  if (!token) {
    res.status(401).json({ message: "Access denied. " });
    return;
  }

  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const validated = jwt.verify(token, jwtSecret);
    req.user = validated as JwtPayload;
    next();
  } catch (error) {
    console.error("jwt error:", error);
    res.status(403).json({ message: "Invalid Token" });
  }
};
