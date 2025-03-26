import { createSlice } from '@reduxjs/toolkit';

interface CategoryState {
    selectedCategory: string;
    featureProductByMen: string;
    featureProductByWomen: string;
}

const initialState: CategoryState = {
    selectedCategory: 'all',
    featureProductByMen: 'men',
    featureProductByWomen:'women',
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