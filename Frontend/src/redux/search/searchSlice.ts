import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import { search } from './searchAction';
import { Product } from '../../model/Search';

interface SearchState {
    products: Product[];
    loading: boolean;
    searchQuery: string;
    error: string | null;
}

const initialState: SearchState = {
    products: [],
    loading: false,
    error: null,
    searchQuery: ''
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchQuery(state, action: PayloadAction<string>) {
            state.searchQuery = action.payload;
        },
        clearSearchResult(state) {
            state.products = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(search.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(search.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(search.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch products";
            })
    }
});

export const { setSearchQuery, clearSearchResult } = searchSlice.actions;
export default searchSlice.reducer;