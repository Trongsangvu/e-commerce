import { createAsyncThunk } from "@reduxjs/toolkit";
import { ILogin, ILoginResponse } from "../../model/Auth";
import { login as loginService } from '../../services/authService';


export const login = createAsyncThunk<ILoginResponse, ILogin>(
    'users/login',
    async (data, { rejectWithValue }) => {
        try {
            const response = await await loginService(data);
            if(response.data) {
                localStorage.setItem('user', JSON.stringify(response.data)); // Convert to string
            }
            console.log("Login successful:", {
                email: data.email,
                password: data.password,
                token: response.data.token
            })
            return response.data;
        }
        catch (error) {
            console.log("Error response: ", error);
            return rejectWithValue(error);
        }
    }
)