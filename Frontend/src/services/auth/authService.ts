import { AxiosResponse } from 'axios'
import { ILogin, IUserResponse, ILoginResponse, IRegister, IRegisterResponse,IOAuthUser, IOAuthResponse } from "../../model/Auth";
import HttpService from '../HttpService';
import { getToken } from '../../auth/authToken';

// Login service
const login = (data: ILogin): Promise<AxiosResponse<ILoginResponse>> => {
    return HttpService.post("/auth/login", data, { requiresAuth: false });
}

// Logout service
const logout = (): Promise<AxiosResponse> => {
    return HttpService.post("/auth/logout", {}, { requiresAuth: true });
}

// Register service
const register = (data: IRegister):  Promise<AxiosResponse<IRegisterResponse>> => {
    return HttpService.post("/auth/register", data);
}

// Oauth Login service
const oauthLogin = async (data: IOAuthUser): Promise<AxiosResponse<IOAuthResponse>> => {
    try {
        if (!data || !data.email) {
            throw new Error("Missing required email in OAuth data");
        }

        console.log("Sending OAuth data: ", data);  
        return await HttpService.post("/auth/oauth/appwrite-login", data);
    } catch (error) {
        console.error("Oauth login error: ", error);
        throw error;
    }   
}

// Get profile user
const getProfileUser = async (): Promise<IUserResponse> => {
    const token = getToken();
    if (!token) {
        console.error("No token found in cookies");
        throw new Error("No token found");
    }

    try {
        const response = await HttpService.get<IUserResponse>("/users/profile");
        
        console.log('Profile Response:', response);
       return response.data;
    } catch (error) {
        console.error("Error get profile user: ", error);
        throw error;    
    }
}

export { login, logout, register, getProfileUser, oauthLogin }