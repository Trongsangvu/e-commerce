import { AxiosResponse } from "axios";
import { ISearch, ISearchResponse } from "../model/Search";
import httpService from "./http-service";

export const searchProducts = async (
  data: ISearch,
): Promise<ISearchResponse> => {
  try {
    const response: AxiosResponse<ISearchResponse> = await httpService.get(
      "/products/search",
      { name: data.name },
    );

    return response.data ?? []; // return list of products
  } catch (error) {
    console.error("Search API error:", error);
    return []; // Avoid error when API failed
  }
};
