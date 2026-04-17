import productEndpoints from "../api/product.api";
import { ISearch, ISearchResponse } from "../types/search-type";
import httpService from "./http-service";

export const searchProducts = async (
  data: ISearch,
): Promise<ISearchResponse> => {
  const res = await httpService.get<ISearchResponse>(productEndpoints.search, {
    name: data.name,
  });

  return res.data ?? [];
};
