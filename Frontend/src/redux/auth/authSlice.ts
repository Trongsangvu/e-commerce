import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login, register } from './authAction';
import { ILoginResponse } from '../../model/Auth';


// Implicity authReducer
interface AuthState {
    user: ILoginResponse | null;
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
                state.user = payload;
                state.isAuthenticated = true;
                state.status = 'succeeded';
                state.error = null;
                localStorage.setItem('user', JSON.stringify(payload));
                
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
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;