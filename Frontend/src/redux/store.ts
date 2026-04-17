import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./app/app-slice";
import authReducer from "./auth/auth-slice";
import cartReducer from "./cart/cart-slice";
import categoryReducer from "./product/filter-product-slice";
import searchReducer from "./product/search-slice";
import sideBarReducer from "./app/sidebar-slice";
import userReducer from "./user/user-slice";

export const store = configureStore({
  reducer: {
    app: appReducer,
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
