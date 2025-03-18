import { createAsyncThunk } from "@reduxjs/toolkit";
import { ISearch } from '../../model/Search';
import { search as searchService } from '../../services/searchService';
import { AxiosError } from "axios";
import { Product } from '../../model/Search';

export const search = createAsyncThunk<Product[], ISearch>(
    '/products/search',
    async (data, { rejectWithValue }) => {
        try {
            const response = await searchService(data);
            
            if (!Array.isArray(response.data)) {
                throw new Error("Invalid response structure");
            }
            
            console.log("Fetched Products:", response.data);

            return response.data;
        }
        catch(error) {
            console.log("Error response: ", error);
            const axiosError = error as AxiosError;
            return rejectWithValue((axiosError.response?.data as { message: string })?.message || "Unknown error");
        }
    }
)
