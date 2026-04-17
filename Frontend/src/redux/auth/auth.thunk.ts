import {
  login as loginService,
  logout as logoutService,
  oauthLogin as oauthLoginService,
  register as registerService,
} from "../../services/auth-service";
import { ILogin, IOAuthUser, IRegister } from "../../types/auth-type";
import { createAppThunk } from "../../utils/create-app-thunk-util";
import { clearAuth, setAuth } from "./auth.helper";

export const login = createAppThunk(
  "auth/login",
  async (data: ILogin) => {
    const res = await loginService(data);
    setAuth(res.token, res.user);
    return res;
  },
);

export const logout = createAppThunk(
  "auth/logout",
  async () => {
    await logoutService();
    clearAuth();
    return true;
  },
);

export const register = createAppThunk(
  "auth/register",
  async (data: IRegister) => {
    const res = await registerService(data);
    return res;
  },
);

export const oauthLogin = createAppThunk(
  "auth/oauth",
  async (data: IOAuthUser) => {
    const res = await oauthLoginService(data);

    if (!res?.token || !res?.user) {
      throw new Error("Invalid response");
    }

    setAuth(res.token, res.user);
    return res;
  },
);
