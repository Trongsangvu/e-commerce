import Cookies from "js-cookie";

const TOKEN_KEY = 'token';
const REFRESH_TOKEN_KEY = 'refreshToken';

// AccessToken
export const getToken = (): string | null => Cookies.get(TOKEN_KEY) || null;
export const setToken = (token: string) => Cookies.set(TOKEN_KEY, token, { secure: false, sameSite: 'Strict', expires: 1/24 });
export const removeToken = () => Cookies.remove(TOKEN_KEY);

// RefreshToken
// Những hàm này chỉ hoạt động nếu refreshToken KHÔNG phải là httpOnly
export const getRefreshToken = (): string | null => Cookies.get(REFRESH_TOKEN_KEY) || null;
export const setRefreshToken = (token: string) => Cookies.set(REFRESH_TOKEN_KEY, token, { secure: false, sameSite: 'Strict', expires: 7 });
export const removeRefreshToken = () => Cookies.remove(REFRESH_TOKEN_KEY);
