import productEndpoints from "../api/product.api";
import {
  IProductDetailResponse,
  IProductListResponse,
} from "../types/product-type";
import httpService from "./http-service";

// Get list products
export const list = async (): Promise<IProductListResponse> => {
  const res = await httpService.get<IProductListResponse>(
    productEndpoints.list,
  );
  return res.data;
};

// Get products by id
export const byId = async (id: string): Promise<IProductDetailResponse> => {
  const response = await httpService.get<IProductDetailResponse>(
    productEndpoints.byId(id),
  );

  return response.data;
};

