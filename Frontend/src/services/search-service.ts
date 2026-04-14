import { ISearch, ISearchResponse } from "../model/Search";
import httpService from "./http-service";
import productEndpoints from "../api/product.api";

export const searchProducts = async (
  data: ISearch,
): Promise<ISearchResponse> => {
  const res = await httpService.get<ISearchResponse>(productEndpoints.search, {
    name: data.name,
  });

  return res.data ?? [];
};
