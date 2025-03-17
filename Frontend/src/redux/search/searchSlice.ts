import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import { search } from './searchAction';
import { Product } from '../../model/Search';

// Define the ISearchResponse interface
interface ISearchResponse {
    products: Product[];
    // ...other properties if any...
}

interface SearchState {
    products: Product[];
    loading: boolean;
    searchItem: string;
    error: string | null;
}

const initialState: SearchState = {
    products: [],
    loading: false,
    error: null,
    searchItem: ''
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchItem(state, action: PayloadAction<string>) {
            state.searchItem = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(search.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(search.fulfilled, (state, action: PayloadAction<ISearchResponse>) => {
                state.loading = false;
                state.products = action.payload.products;
            })
            .addCase(search.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch products";
            })
    }
});

export const { setSearchItem } = searchSlice.actions;
export default searchSlice.reducer;