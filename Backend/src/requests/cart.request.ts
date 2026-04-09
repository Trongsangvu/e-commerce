import z from "zod";
import { objectIdSchema } from "./base.request";
import { Request } from "express";

export const addToCartRequest = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
  body: z.object({
    id: objectIdSchema,
    quantity: z
      .number()
      .int("Quantity must be an integer")
      .min(1, "Quantity must be at least 1"),
  }),
});

export const removeFromCartRequest = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});

export type AddToCartRequest = z.infer<typeof addToCartRequest>;
export type RemoveFromCartRequest = Request<
  z.infer<typeof removeFromCartRequest>["params"]
>;
