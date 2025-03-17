import { AxiosResponse } from 'axios';
import HttpService from './HttpService';
import { ISearch, ISearchResponse } from '../model/Search';

export const search = (data: ISearch): Promise<AxiosResponse<ISearchResponse>> => {
    return HttpService.get("/products", { params: { name: data.name } });
}