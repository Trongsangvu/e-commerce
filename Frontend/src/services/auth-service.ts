import { AxiosResponse } from "axios";

import authEndpoints from "../api/auth.api";
import userEndpoints from "../api/user.api";
import { ApiResponse } from "../types/api-type";
import { ILogin, ILoginResponse, IOAuthResponse, IOAuthUser, IRegister, IRegisterResponse, IUserResponse } from "../types/auth-type";
import httpService from "./http-service";

// Login service
export const login = async (data: ILogin): Promise<ILoginResponse> => {
  const { data: res } = await httpService.post<ApiResponse<ILoginResponse>, ILogin>(
    authEndpoints.login, data, { requiresAuth: false },
  );
  return res.data;
};

// Logout service
export const logout = (): Promise<AxiosResponse> => {
  return httpService.post(authEndpoints.logout, {}, { requiresAuth: true });
};

// Register service
export const register = async (data: IRegister): Promise<IRegisterResponse> => {
  const { data: res } = await httpService.post<ApiResponse<IRegisterResponse>, IRegister>(
    authEndpoints.register, data
  );

  return res.data;
};

// Oauth Login service
export const oauthLogin = async (data: IOAuthUser): Promise<IOAuthResponse> => {
  const { data: res } = await httpService.post<ApiResponse<IOAuthResponse>, IOAuthUser>(
    authEndpoints.oauthLogin, data
  );

  return res.data;
};

// Get profile user
export const getProfileUser = async (): Promise<IUserResponse> => {
  const { data: res } = await httpService.get<ApiResponse<IUserResponse>>(
    userEndpoints.profile,
  );
  return res.data;
};
