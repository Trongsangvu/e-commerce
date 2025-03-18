import { createSlice, PayloadAction} from '@reduxjs/toolkit';
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
});

export const { setSearchQuery, clearSearchResult } = searchSlice.actions;
export default searchSlice.reducer;