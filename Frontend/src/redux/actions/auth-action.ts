import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import authEndpoints from "../../api/auth.api";
import {
  removeRefreshToken,
  removeToken,
  setToken,
} from "../../auth/auth-token";
import {
  ILogin,
  ILoginResponse,
  IOAuthResponse,
  IOAuthUser,
  IRegister,
  IRegisterResponse,
} from "../../model/Auth";
import {
  login as loginService,
  logout as logoutService,
  oauthLogin as oauthLoginService,
  register as registerService,
} from "../../services/auth-service";
import { handleAxiosError, RejectType } from "../../utils/error.util";

export const login = createAsyncThunk<
  ILoginResponse,
  ILogin,
  { rejectValue: RejectType }
>(authEndpoints.login, async (data, { rejectWithValue }) => {
  try {
    const res = await loginService(data);

    setToken(res.token);
    localStorage.setItem("user", JSON.stringify(res.user));

    return res;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

export const logout = createAsyncThunk<
  boolean,
  void,
  { rejectValue: RejectType }
>(authEndpoints.logout, async (_, { rejectWithValue }) => {
  try {
    await logoutService();

    // Clear cookies
    localStorage.clear();
    removeToken();
    removeRefreshToken();

    return true;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

export const register = createAsyncThunk<
  IRegisterResponse,
  IRegister,
  { rejectValue: RejectType }
>(authEndpoints.register, async (data, { rejectWithValue }) => {
  try {
    const res = await registerService(data);

    localStorage.setItem("user", JSON.stringify(res));

    return res;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

export const oauthLogin = createAsyncThunk<
  IOAuthResponse,
  IOAuthUser,
  { rejectValue: RejectType }
>(authEndpoints.oauthLogin, async (data, { rejectWithValue }) => {
  try {
    const res = await oauthLoginService(data);

    // Check and ensure that data is valid
    if (!res?.token || !res?.user) {
      return rejectWithValue({
        message: "Invalid response data",
        status: 400,
      });
    }

    setToken(res.token);
    Cookies.set("user", JSON.stringify(res.user));

    return res;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});
