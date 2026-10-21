import productEndpoints from "../api/product.api";
import { ApiResponse } from "../types/api-type";
import { IProduct, IProductDetailResponse, IProductListResponse } from "../types/product-type";
import httpService from "./http-service";

interface Params {
  search?: string;
  page?: number;
  limit?: number;
}

export const list = async (params?: Params): Promise<IProductListResponse> => {
  const { data: res } = await httpService.get<
    ApiResponse<{ products: IProduct[]; count?: number; }>,
    Params
  >(productEndpoints.list, params);

  return res.data.products;
};

export const byId = async (id: string): Promise<IProductDetailResponse> => {
  const { data: res } = await httpService.get<
    ApiResponse<{ products: IProduct; }>
  >(productEndpoints.byId(id));

  return res.data.products;
};
