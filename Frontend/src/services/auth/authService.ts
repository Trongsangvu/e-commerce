import { AxiosResponse } from 'axios'
import { ILogin, IUserResponse, ILoginResponse, IRegister, IRegisterResponse } from "../../model/Auth";
import HttpService from '../HttpService';

const login = (data: ILogin): Promise<AxiosResponse<ILoginResponse>> => {
    return HttpService.post("/auth/login", data);
}

const register = (data: IRegister):  Promise<AxiosResponse<IRegisterResponse>> => {
    return HttpService.post("/auth/register", data);
}

const getProfileUser = async (): Promise<IUserResponse> => {
    const token = localStorage.getItem("token");
    try {
        const response = await HttpService.get<IUserResponse>("/users/profile", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('Profile Response:', response);
       return response.data;
    } catch (error) {
        console.error("Error get profile user: ", error);
        throw error;
    }
}

export { login, register, getProfileUser }