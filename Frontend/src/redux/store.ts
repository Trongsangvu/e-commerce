import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth-slice";
import cartReducer from "./slices/cart-slice";
import categoryReducer from "./slices/filter-product-slice";
import searchReducer from "./slices/search-slice";
import sideBarReducer from "./slices/sidebar-slice";
import userReducer from "./slices/user-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
    sideBar: sideBarReducer,
    category: categoryReducer,
    cart: cartReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootStore = ReturnType<typeof store.getState>;
