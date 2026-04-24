import productEndpoints from "../api/product.api";
import {
  IProductDetailResponse,
  IProductListResponse,
  IProduct,
} from "../types/product-type";
import httpService from "./http-service";

interface Params {
  search?: string;
  page?: number;
  limit?: number;
}

export const list = async (params?: Params): Promise<IProductListResponse> => {
  const res = await httpService.get<
    {
      success: boolean;
      data: { products: IProduct[]; count?: number };
    },
    Params
  >(productEndpoints.list, params);

  return res.data.data.products;
};

export const byId = async (id: string): Promise<IProductDetailResponse> => {
  const response = await httpService.get<{
    success: boolean;
    data: { products: IProduct };
  }>(productEndpoints.byId(id));

  return response.data.data.products;
};
