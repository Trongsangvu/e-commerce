import { AxiosResponse } from "axios";
import { getToken } from "../auth/auth-token";
import { ILogin, ILoginResponse, IOAuthResponse, IOAuthUser, IRegister, IRegisterResponse, IUserResponse } from "../model/Auth";
import httpService from "./http-service";

// Login service
const login = (data: ILogin): Promise<AxiosResponse<ILoginResponse>> => {
  return httpService.post("/auth/login", data, { requiresAuth: false });
};

// Logout service
const logout = (): Promise<AxiosResponse> => {
  return httpService.post("/auth/logout", {}, { requiresAuth: true });
};

// Register service
const register = (
  data: IRegister,
): Promise<AxiosResponse<IRegisterResponse>> => {
  return httpService.post("/auth/register", data);
};

// Oauth Login service
const oauthLogin = async (
  data: IOAuthUser,
): Promise<AxiosResponse<IOAuthResponse>> => {
  try {
    if (!data || !data.email) {
      throw new Error("Missing required email in OAuth data");
    }

    console.log("Sending OAuth data: ", data);
    return await httpService.post("/auth/oauth/appwrite-login", data);
  } catch (error) {
    console.error("Oauth login error: ", error);
    throw error;
  }
};

// Get profile user
const getProfileUser = async (): Promise<IUserResponse> => {
  const token = getToken();
  if (!token) {
    console.error("No token found in cookies");
    throw new Error("No token found");
  }

  try {
    const response = await httpService.get<IUserResponse>("/users/profile");

    console.log("Profile Response:", response);
    return response.data;
  } catch (error) {
    console.error("Error get profile user: ", error);
    throw error;
  }
};

export { getProfileUser, login, logout, oauthLogin, register };

