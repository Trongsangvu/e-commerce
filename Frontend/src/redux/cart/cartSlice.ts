import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
    productId: string;
    quantity: number;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addQuantity(state, action: PayloadAction<{ index: number }>) {
            const { index } = action.payload;
            if(state.items[index]) {
                state.items[index].quantity += 1;
            }
            // state.quantity = state.quantity + 1;
        },
        decreaseQuantity(state, action: PayloadAction<{ index: number }>) {
            const { index } = action.payload;
            if(state.items[index] && state.items[index].quantity > 1) {
                state.items[index].quantity -= 1;
            }
        },
        setCartItems(state, action: PayloadAction<CartItem[]>) {
            state.items = action.payload;
        }   
    }
});

export const { setCartItems, addQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;