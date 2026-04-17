import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getToken,
  removeRefreshToken,
  removeToken,
} from "../../auth/auth-token";
import {
  AuthUser,
  ILoginResponse,
  IOAuthResponse,
  IRegisterResponse,
} from "../../types/auth-type";
import { AsyncState, pending, rejected } from "../../utils/async-handler.util";
import { login, logout, oauthLogin, register } from "./auth.thunk";

interface AuthState extends AsyncState {
  user: AuthUser | null;
  isAuthenticated: boolean;
}

const storedUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user")!)
  : null;

const initialState: AuthState = {
  user: storedUser,
  isAuthenticated: false,
  loading: false,
  error: null,
  status: "idle",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    checkAuth: (state) => {
      const token = getToken();
      const user = localStorage.getItem("user");
      if (!token && !user) {
        state.isAuthenticated = false;
        state.user = null;
        localStorage.removeItem("user");
        removeToken();
        removeRefreshToken();
      } else {
        state.isAuthenticated = true;
        state.user = user ? JSON.parse(user) : null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Login reducers
      .addCase(login.pending, pending)
      .addCase(
        login.fulfilled,
        (state, { payload }: PayloadAction<ILoginResponse>) => {
          state.loading = false;
          state.user = payload.user;
          state.isAuthenticated = true;
          state.status = "succeeded";
        },
      )
      .addCase(register.rejected, rejected)

      // Logout reducers
      .addCase(logout.pending, pending)
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.status = "succeeded";
      })
      .addCase(register.rejected, rejected)

      // Register reducers
      .addCase(logout.pending, pending)
      .addCase(
        register.fulfilled,
        (state, { payload }: PayloadAction<IRegisterResponse>) => {
          state.loading = false;
          state.user = payload.user;
          state.status = "succeeded";
        },
      )
      .addCase(register.rejected, rejected)

      // OAuth login
      .addCase(oauthLogin.pending, pending)
      .addCase(
        oauthLogin.fulfilled,
        (state, { payload }: PayloadAction<IOAuthResponse>) => {
          state.user = payload.user;
          state.isAuthenticated = true;
          state.status = "succeeded";
        },
      )
      .addCase(oauthLogin.rejected, rejected);
  },
});

export const { checkAuth } = authSlice.actions;
export default authSlice.reducer;
