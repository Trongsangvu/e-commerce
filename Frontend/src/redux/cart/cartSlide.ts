import { createSlice } from "@reduxjs/toolkit";

interface CartState {
    quantity: number;
}

const initialState: CartState = {
    quantity: 1
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addQuantity(state) {
            state.quantity = state.quantity + 1;
        },
        decreaseQuantity(state) {
            if(state.quantity > 0) {
                state.quantity = state.quantity - 1;
            }
        },
        setQuantity(state, action) {
            state.quantity = action.payload;
        }
    }
});

export const { setQuantity, addQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;