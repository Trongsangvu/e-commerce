// import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:3000/api';

// export default {
//     get: axios.get,
//     post: axios.post
// };

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { getToken, removeToken } from "../auth/authToken";

class HttpService {
    private axiosInstance: AxiosInstance;

    constructor() {
        // Create an instance with default configuration
        this.axiosInstance = axios.create({
            baseURL: 'http://localhost:3000/api',
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Interceptor to add the token to the request 
        this.axiosInstance.interceptors.request.use(
            config => {
                const token = getToken()?.trim();
                if(token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                } else {
                    console.warn("No auth token found in localStorage!");
                }
                return config;
            },
            error => Promise.reject(error)
        );

        // Interceptor to handle global errors
        this.axiosInstance.interceptors.response.use(
            response => response,
            error => {
                // Handle general errors such as 404-authorized, 403-forbidden
                if(error.response.status === 401) {
                    // Logout the user, redirect to login page
                    // localStorage.removeItem('token');
                    removeToken();
                    // window.location.href = '/login';
                } 
                return Promise.reject(error);
            }
        )

    }
    
    // Method GET
    public get<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
            return this.axiosInstance.get<T>(url, { params: data, ...config });
    }

    // Method POST
    // public post<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    //     const token = getToken()?.trim();
    //     if (!token) {
    //         // Nếu không có token, throw error hoặc xử lý phù hợp
    //         console.log('No auth token found in localStorage!');
    //         throw new Error('No auth token found');
    //     }

    //     return this.axiosInstance.post<T>(url, data, {
    //         ...config,
    //         headers: {
    //             ...config?.headers,
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${token}` 
    //         }
    //     }).catch(error => {
    //         console.error('API request failed', error);
    //         throw error;
    //     });
    // }
    // Sửa phương thức post()
    public post<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig & { requiresAuth?: boolean }): Promise<AxiosResponse<T>> {
        const token = localStorage.getItem('token');
        const requiresAuth = config?.requiresAuth !== false; // Mặc định là true
        
        if (requiresAuth && !token) {
            console.warn('No auth token found in localStorage!');
            // Thay vì throw error, có thể redirect người dùng đến trang đăng nhập
            // window.location.href = '/login';
            return Promise.reject(new Error('Authentication required'));
        }

        return this.axiosInstance.post<T>(url, data, config).catch(error => {
            console.error('API request failed', error);
            throw error;
        });
    }

    // Method PUt 
    public put<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.axiosInstance.put<T>(url, data, config);
    }

    public patch<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.axiosInstance.put<T>(url, data, {
            ...config,
            headers: {
                ...config?.headers,
                'Content-Type': 'application/json'
            }
        });
    }
}

export default new HttpService();