import { AxiosResponse } from 'axios'
import { ILogin, ILoginResponse } from "../model/Auth";
import HttpService from './HttpService';

const login = (data: ILogin): Promise<AxiosResponse<ILoginResponse>> => {
    return HttpService.post("/users/login", data);
}

export { login }