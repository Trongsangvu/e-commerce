import HttpService from './HttpService';
import { IProductResponse } from '../types/product-type';

export const productsList = async (): Promise<IProductResponse> => {
    const response = await HttpService.get("/products");
    return response.data;
}