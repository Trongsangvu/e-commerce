// import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:3000/api';

// export default {
//     get: axios.get,
//     post: axios.post
// };

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

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
                const token = localStorage.getItem('token')?.trim();
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
                    localStorage.removeItem('token');
                    // window.location.href = '/login';
                } 
                return Promise.reject(error);
            }
        )

    }
    
    // Method GET
    public get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
            return this.axiosInstance.get<T>(url, config);
    }

    // Method POST
    public post<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.axiosInstance.post<T>(url, data, config);
    }

    // Method PUt 
    public put<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.axiosInstance.put<T>(url, data, config);
    }
}

export default new HttpService();