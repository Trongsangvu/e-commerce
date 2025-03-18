import { AxiosResponse } from 'axios';
import HttpService from './HttpService';
import { ISearch, ISearchResponse } from '../model/Search';

export const search = (data: ISearch): Promise<AxiosResponse<ISearchResponse>> => {
    const response = HttpService.get("/products/search", { params: { name: data.name } });
    return response;
}