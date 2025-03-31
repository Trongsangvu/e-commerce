import { createAsyncThunk } from '@reduxjs/toolkit';
import { CartData, ICartResponse } from '../../types/cart-type';
import { updateCart } from '../../services/cartService';
import { AxiosError } from 'axios';


interface ErrorResponse {
    message: string;
}
export const updatedCartAction = createAsyncThunk<ICartResponse, CartData>(
    'cart/update',
    async (data, { rejectWithValue }) => {
        try {
            const response = await updateCart(data);
            return response.data;
        }
        catch(error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            return rejectWithValue(axiosError.response?.data?.message || "Failed to update cart");
        }
    }
);