import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartItem } from "../../types/cart-type";
import { AsyncState, pending, rejected } from "../../utils/async-handler.util";
import { updateTotals } from "../../utils/cart.util";
import { addToCartAction, updateCartAction } from "../cart/cart.thunk";

export interface CartState extends AsyncState {
  items: ICartItem[];
  error: string | null;
  quantity: number;
  totalQuantity: number;
  totalAmount: number;
}

const initialState: CartState = {
  items: [],
  error: null,
  quantity: 1,
  totalQuantity: 0,
  totalAmount: 0,
  status: "idle",
  loading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addQuantity(state, action: PayloadAction<{ index: number }>) {
      const item = state.items[action.payload.index];

      if (item) {
        item.quantity += 1;
        updateTotals(state);
      } else {
        state.quantity += 1;
      }
    },
    decreaseQuantity(state, action: PayloadAction<{ index: number }>) {
      const item = state.items[action.payload.index];

      if (item && item.quantity > 1) {
        item.quantity -= 1;
        updateTotals(state);
      } else if (!item && state.quantity > 1) {
        state.quantity -= 1;
      }
    },
    setCartItems(state, action: PayloadAction<ICartItem[]>) {
      state.items = action.payload;
      updateTotals(state);
    },
  },
  extraReducers: (builder) => {
    builder
      // add to cart
      .addCase(addToCartAction.pending, pending)
      .addCase(addToCartAction.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";

        state.items = action.payload.cart.items;
        updateTotals(state);
      })
      .addCase(addToCartAction.rejected, rejected)

      // update cart
      .addCase(updateCartAction.pending, pending)
      .addCase(updateCartAction.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";

        state.items = action.payload.cart.items;
        updateTotals(state);
      })
      .addCase(updateCartAction.rejected, rejected);
  },
});

export const { setCartItems, addQuantity, decreaseQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
