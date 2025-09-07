import { Request, Response, NextFunction } from "express";
export const isAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user || req.user.role !== "admin") {
    res.status(403).json({ message: "Forbidden: Admin only" });
    return;
  }
  next();
};
