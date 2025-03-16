import { createAsyncThunk } from "@reduxjs/toolkit";
import { ISearch, ISearchResponse} from '../../model/Search';
import { search as searchService } from '../../services/searchService';

export const search = createAsyncThunk<ISearchResponse, ISearch>(
    '/products',
    async (data, { rejectWithValue }) => {
        try {
            const response = await searchService(data);
            console.log("Get Producs success:", {
                name: data.name,
                imageUrl: data.imageUrl,
                category: data.category
            })

            return response.data;
        }
        catch(error) {
            console.log("Error response: ", error);
            return rejectWithValue(error);
        }
    }
)
