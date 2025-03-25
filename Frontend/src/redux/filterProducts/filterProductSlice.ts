import { createSlice } from '@reduxjs/toolkit';

interface CategoryState {
    selectedCategory: string;
    featureProducts: string;
}

const initialState: CategoryState = {
    selectedCategory: 'all',
    featureProducts: 'men'
}

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
    }
});

export const { setCategory } = categorySlice.actions;
export default categorySlice.reducer;   