import { createAsyncThunk } from "@reduxjs/toolkit";
import { ILogin, ILoginResponse, IRegister, IRegisterResponse } from "../../model/Auth";
import { login as loginService } from '../../services/authService';
import { register as registerService } from '../../services/authService';

export const login = createAsyncThunk<ILoginResponse, ILogin>(
    'auth/login',
    async (data, { rejectWithValue }) => {
        try {
            const response = await loginService(data);
            if(response.data) {
                localStorage.setItem('user', JSON.stringify(response.data)); // Convert to string
            }
            
            console.log("Login successful:", {
                email: data.email,
                // password: data.password,
                token: response.data.token
            });

            return response.data;
        }
        catch (error) {
            console.log("Error response: ", error);
            return rejectWithValue(error);
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