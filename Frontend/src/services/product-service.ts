import { IProductResponse, Product } from "../types/product-type";
import httpService from "./http-service";

// Get all products
export const productsList = async (): Promise<IProductResponse> => {
  const response = await httpService.get("/products");
  return response.data as IProductResponse;
};

// Get products by id
export const getProductById = async (id: string): Promise<Product> => {
  try {
    const response = await httpService.get(`/products/${id}`);
    return response.data as Product;
  } catch (error) {
    throw new Error(`Failed to fetch product: ${error}`);
  }
};
