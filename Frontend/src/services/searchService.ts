import { AxiosResponse } from 'axios';
import HttpService from './HttpService';
import { ISearch, ISearchResponse } from '../model/Search';

export const search = (data: ISearch): Promise<AxiosResponse<ISearchResponse>> => {
    const response = HttpService.get("/products", { params: { name: data.name } });
    console.log("API Response:", response); // ✅ Log full response
    return response;
}