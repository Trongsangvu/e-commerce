import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updatedCartAction } from "./cartAction";

export interface CartItem {
    productId: string;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    status: string;
    error: string | null;
}

const initialState: CartState = {
    items: [],
    status: 'idle',
    error: null
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(updatedCartAction.pending, (state) => {
                state.status = "Loading";
            })
            .addCase(updatedCartAction.fulfilled, (state, action) => {
                state.status = "Succeeded";
                state.items = action.payload.cart.items.map(item => ({
                    productId: item.productId._id,
                    quantity: item.quantity
                }));
            })
            .addCase(updatedCartAction.rejected, (state, action) => {
                state.status = "Failed";
                state.error = action.payload as string;
            })
    }
});

export const { setCartItems, addQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;