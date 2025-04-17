import Cookies from "js-cookie";

const TOKEN_KEY = 'token';

export const getToken = (): string | null => Cookies.get(TOKEN_KEY) || null;
export const setToken = (token: string) => Cookies.set(TOKEN_KEY, token, { secure: true, sameSite: 'Strict', expires: 7 });
export const removeToken = () => Cookies.remove(TOKEN_KEY);