import { createAsyncThunk } from '@reduxjs/toolkit';
import { CartData, ICartResponse } from '../../types/cart-type';
import { updateCart, addToCart } from '../../services/cart/cartService';
import { AxiosError } from 'axios';


interface ErrorResponse {
    message: string;
}

export const addToCartAction = createAsyncThunk<ICartResponse,CartData>(
    'carts/add',
    async (data, { rejectWithValue }) => {
        try {
            const response = await addToCart(data);
            return response.data;
        } catch(error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            return rejectWithValue(axiosError.response?.data?.message || "Failed to add to cart");
        }
    }
)

export const updatedCartAction = createAsyncThunk<ICartResponse, CartData>(
    'carts/update',
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