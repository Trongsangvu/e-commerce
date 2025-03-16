import { createSlice, PayloadAction} from '@reduxjs/toolkit';

interface SearchState {
    searchItem: string;
}

const initialState: SearchState = {
    searchItem: ''
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchItem(state, action: PayloadAction<string>) {
            state.searchItem = action.payload;
        }
    }
});

export const { setSearchItem } = searchSlice.actions;
export default searchSlice.reducer;