import { createAsyncThunk } from '@reduxjs/toolkit';
import { CartData, ICartResponse } from '../../types/cart-type';
import { updateCart } from '../../services/cartService';

export const updatedCartAction = createAsyncThunk<ICartResponse, CartData>(
    'cart/update',
    async (data, { rejectWithValue }) => {
        try {
            const response = await updateCart(data);
            return response.data;
        }
        catch(error) {
            console.log("Error response: ", error);
            return rejectWithValue(error);
        }
    }
);