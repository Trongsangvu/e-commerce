import Cookies from "js-cookie";

const TOKEN_KEY = 'token';

export const getToken = (): string | null => Cookies.get(TOKEN_KEY) || null;
export const setToken = (token: string) => Cookies.set(TOKEN_KEY, token, { secure: true, sameSite: 'Strict', expires: 7 });
export const removeToken = () => Cookies.remove(TOKEN_KEY);

export const getTokenStorage = (): string | null => localStorage.getItem(TOKEN_KEY) || null;
export const setTokenStorage = (token: string) => localStorage.setItem(TOKEN_KEY, token);
export const removeTokenStorage = () => localStorage.removeItem(TOKEN_KEY);