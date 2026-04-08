import { NextFunction, Request, Response } from "express";
import { ZodObject, ZodRawShape } from "zod";
import { ApiResponse } from "../configs/response";

type AnyZodObject = ZodObject<ZodRawShape>;

const formatErrors = (issues: any[]) => {
  const errors: Record<string, string> = {};

  issues.forEach((err) => {
    const key = err.path.join(".");
    errors[key] = err.message;
  });

  return errors;
};

export const validateRequest =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!result.success) {
      const errorMessage = formatErrors(result.error.issues);
      ApiResponse.BadRequest(res, JSON.stringify(errorMessage));
    }
    next();
  };
