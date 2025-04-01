import { AxiosResponse } from 'axios';
import HttpService from '../HttpService';
import { ISearch, ISearchResponse } from '../../model/Search';

export const searchProducts = async (data: ISearch): Promise<ISearchResponse> => {
    try {
        const response: AxiosResponse<ISearchResponse> = await HttpService.get(
            "/products/search", { params: { name: data.name } }
        );

        return response.data ?? []; // return list of products
    } catch(error) {
        console.error("Search API error:", error);
        return []; // Avoid error when API failed
    }
}