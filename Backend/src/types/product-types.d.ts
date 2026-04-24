import { ProductCategory } from "../configs/enum";

export interface IProduct {
  name: string;
  price: number;
  category: ProductCategory;
  currency: "USD";
  description?: string;
  image_url?: string;
  tags: string[];
  brand: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BadgeProductInput {
  createdAt: Date;
  price: number;
  soldCount?: number;
  viewCount?: number;
  discount?: number;
}
