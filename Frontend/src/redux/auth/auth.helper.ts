import Cookies from "js-cookie";
import { AuthUser } from "../../types/auth-type";

export const setAuth = (token: string, user: AuthUser) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
};

export const clearAuth = () => {
  localStorage.clear();
  Cookies.remove("user");
};

export const getStoredAuth = () => {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  return {
    user: user ? JSON.parse(user) : null,
    isAuthenticated: !!token,
  };
};