import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updatedCartAction, addToCartAction } from "./cartAction";
import { ICartItem, ICart } from "../../types/cart-type";

interface CartState extends Omit<ICart, "items"> {
  items: ICartItem[];
  status: string;
  error: string | null;
  quantity: number;
}

const initialState: CartState = {
  items: [],
  status: "idle",
  error: null,
  quantity: 1,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addQuantity(state, action: PayloadAction<{ index: number }>) {
      const { index } = action.payload;
      if (state.items[index]) {
        state.items[index].quantity += 1;

        // update totals
        state.totalQuantity = state.items.reduce((total, item) => {
          return total + item.quantity;
        }, 0);
        state.totalAmount = state.items.reduce((total, item) => {
          return total + item.quantity * item.productId.price;
        }, 0);
      } else {
        state.quantity += 1;
      }
    },
    decreaseQuantity(state, action: PayloadAction<{ index: number }>) {
      const { index } = action.payload;
      if (state.items[index] && state.items[index].quantity > 1) {
        state.items[index].quantity -= 1;
      } else if (!state.items[index] && state.quantity && state.quantity > 1) {
        state.quantity = state.quantity - 1;
      }
    },
    setCartItems(state, action: PayloadAction<ICartItem[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // add to cart
      .addCase(addToCartAction.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(addToCartAction.fulfilled, (state, action) => {
        state.status = "Succeeded";
        state.items = action.payload.cart.items || action.payload;
      })
      .addCase(addToCartAction.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.payload as string;
      })
      // update cart
      .addCase(updatedCartAction.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(updatedCartAction.fulfilled, (state, action) => {
        state.status = "Succeeded";
        state.items = action.payload.cart.items;
      })
      .addCase(updatedCartAction.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.payload as string;
      });
  },
});

export const { setCartItems, addQuantity, decreaseQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
