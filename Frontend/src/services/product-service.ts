import productEndpoints from "../api/product.api";
import {
  IProductDetailResponse,
  IProductListResponse,
  IProduct,
} from "../types/product-type";
import httpService from "./http-service";

export const list = async (): Promise<IProductListResponse> => {
  const res = await httpService.get<{
    success: boolean;
    data: { products: IProduct[]; count?: number };
  }>(productEndpoints.list);

  return res.data.data.products;
};

export const byId = async (id: string): Promise<IProductDetailResponse> => {
  const response = await httpService.get<{
    success: boolean;
    data: { products: IProduct };
  }>(productEndpoints.byId(id));

  return response.data.data.products;
};
