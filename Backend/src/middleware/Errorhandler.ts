import { Request, Response } from "express";

const errorHandler = (err: Error, req: Request, res: Response): void => {
  console.log(err.stack);
  res.status(500).json({ message: err.message || "Internal Server Error" });
};

export default errorHandler;
