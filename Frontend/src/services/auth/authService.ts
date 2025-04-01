import { AxiosResponse } from 'axios'
import { ILogin, ILoginResponse, IRegister, IRegisterResponse } from "../../model/Auth";
import HttpService from '../HttpService';

const login = (data: ILogin): Promise<AxiosResponse<ILoginResponse>> => {
    return HttpService.post("/auth/login", data);
}

const register = (data: IRegister):  Promise<AxiosResponse<IRegisterResponse>> => {
    return HttpService.post("/auth/register", data);
}

export { login, register }