import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import searchReducer from './search/searchSlice';
import sideBarReducer from './sideBar/sideBarSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        search: searchReducer,
        sideBar: sideBarReducer
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootStore = ReturnType<typeof store.getState>;