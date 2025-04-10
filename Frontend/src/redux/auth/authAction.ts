import { createAsyncThunk } from "@reduxjs/toolkit";
import { ILogin, ILoginResponse, IRegister, IRegisterResponse, IOAuthUser, IOAuthResponse } from "../../model/Auth";
import { login as loginService } from '../../services/auth/authService';
import { register as registerService } from '../../services/auth/authService';
import { oauthLogin as oauthLoginService } from '../../services/auth/authService';
import { AxiosError } from "axios";


export const login = createAsyncThunk<ILoginResponse, ILogin>(
    'auth/login',
    async (data, { rejectWithValue }) => {
        try {
            const response = await loginService(data);
            const userData = response.data;
            
            if(userData?.token) {
                localStorage.setItem("token", userData.token);
                localStorage.setItem("user", JSON.stringify(userData));
            } else {
                console.warn("No token received from API!");
            }
            
            console.log("Login successful:", {
                email: data.email,
                // password: data.password,
                token: userData.token
            });

            return response.data;
        }
        catch (error) {
            const err = error as AxiosError<{ message: string }>;

            console.log("Error response: ", error);
            // return rejectWithValue(error);
            return rejectWithValue(err.response?.data || { message: err.message });
        }
    }
);

export const register = createAsyncThunk<IRegisterResponse, IRegister>(
    'auth/register',
    async (data, { rejectWithValue }) => {
        try {
            const response = await registerService(data);
            if(response.data) {
                localStorage.setItem('user', JSON.stringify(response.data)); // Convert to string
            }

            console.log("Register Successful", {
                email: data.email,
                password: data.password 
            });
            
            return response.data;
        }
        catch(error) {
            console.log("Error response: ", error);
            return rejectWithValue(error);
        }
    }
);

export const oauthLogin = createAsyncThunk<IOAuthResponse, IOAuthUser>(
    'auth/oauth/google',
    async (data, { rejectWithValue }) => {
        try {
            const response = await oauthLoginService(data);
            const userData = response.data;

            
            if (userData?.token) {
                localStorage.setItem("token", userData.token);
                localStorage.setItem("user", JSON.stringify(userData));
            }
            return userData;
        }
        catch (error) {
            // console.log("Error response: ", error);
            // return rejectWithValue(error);
            console.log("Error response: ", error);

            const err = error as AxiosError<{ message: string }>;
            // Lấy thông tin đơn giản từ AxiosError
            const simplifiedError = {
                message: err.response?.data?.message || err.message || "Đã có lỗi xảy ra",
                status: err.response?.status || 500,
            };

            return rejectWithValue(simplifiedError);
        }
    }
)