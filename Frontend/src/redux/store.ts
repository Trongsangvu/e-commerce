import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./app/app-slice";
import sideBarSlice from "./app/sidebar-slice";
import authSlice from "./auth/auth-slice";
import cartSlice from "./cart/cart-slice";
import categorySlice from "./product/filter-product-slice";
import searchSlice from "./product/search-slice";
import userSlice from "./user/user-slice";

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    auth: authSlice.reducer,
    search: searchSlice.reducer,
    sideBar: sideBarSlice.reducer,
    category: categorySlice.reducer,
    cart: cartSlice.reducer,
    user: userSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootStore = ReturnType<typeof store.getState>;
