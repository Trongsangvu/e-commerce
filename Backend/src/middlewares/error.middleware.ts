import { Request, Response } from "express";
import { ApiResponse } from "../configs/response";
import logger from "../configs/logger";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
): void => {
  logger.error(err);
  ApiResponse.InternalServerError(res, err);
};

export const notFoundHandler = (_req: Request, res: Response): void => {
  logger.warn(`Endpoint not found: ${_req.method} ${_req.originalUrl}`, {
    ip: _req.ip,
    userAgent: _req.get("User-Agent"),
  });
  ApiResponse.NotFound(res, "Endpoint not found");
};
