import HttpService from './HttpService';
import { IProductResponse, Product } from '../types/product-type';

// Get all products
export const productsList = async (): Promise<IProductResponse> => {
    const response = await HttpService.get("/products");
    return response.data as IProductResponse;
};

// Get products by id
export const getProductById = async (id: string): Promise<Product> => {
    try {
        const response = await HttpService.get(`/products/${id}`);
        return response.data as Product;
    } catch (error) {
        throw new Error(`Failed to fetch product: ${error}`);
    }
}