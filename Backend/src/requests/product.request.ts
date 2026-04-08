import z from "zod";
import { ProductCategory } from "../configs/enum";

export const createProductRequest = z.object({
  name: z.string().min(1),
  price: z.coerce.number().nonnegative(),
  currency: z.string().optional(),
  category: z.enum(Object.values(ProductCategory)).optional(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  tags: z.string().optional(),
});

export const updateProductRequest = z.object({
  name: z.string().min(1),
  price: z.coerce.number().nonnegative(),
  currency: z.string().optional(),
  category: z.string().optional().nullable(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  tags: z.string().optional(),
});

export type CreateProductRequest = z.infer<typeof createProductRequest>;
export type UpdateProductRequest = z.infer<typeof updateProductRequest>;
