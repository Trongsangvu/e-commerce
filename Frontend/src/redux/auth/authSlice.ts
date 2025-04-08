import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login, oauthLogin, register } from './authAction';
import { AuthUser, ILoginResponse, IRegisterResponse } from '../../model/Auth';


// Implicity authReducer
interface AuthState {
    user: AuthUser | null;
    isAuthenticated: boolean;
    status: string;
    error: string | null;
    loading: boolean;
}

const storedUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem('user')!) : null;

const initialState: AuthState = {
    user: storedUser,
    isAuthenticated: false,
    status: "idle",
    error:  null,
    loading: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem('user');
            localStorage.removeItem("token");
        }
    },
    extraReducers: (builder) => {
        builder
            // Login reducers
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = "loading";
            })
            .addCase(login.fulfilled, (state, { payload }: PayloadAction<ILoginResponse>) => {
                state.loading = false;
                state.user = payload.user;
                state.isAuthenticated = true;
                state.status = 'succeeded';
                state.error = null;
                localStorage.setItem('user', JSON.stringify(payload.user));
                
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.status = 'failed';
                state.error = action.error.message || 'Login failed';
            })
            // Register reducers
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = "loading";
            })
            .addCase(register.fulfilled, (state, { payload }: PayloadAction<IRegisterResponse>) => {
                state.loading = false;
                state.user = payload.user;
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.status = 'failed';
                state.error = action.error.message || "Register failed";
            })
            // OAuth login
            .addCase(oauthLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = "loading";
            })
            .addCase(oauthLogin.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isAuthenticated = true;
                state.status ='succeeded';
                state.error = null;
            })
            .addCase(oauthLogin.rejected, (state, action) => {
                state.error = action.error.message || null;
                state.isAuthenticated = false;
            });

    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;