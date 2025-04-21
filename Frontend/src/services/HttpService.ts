import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { removeToken, removeRefreshToken } from "../auth/authToken";
import Cookies from "js-cookie";

class HttpService {
    private axiosInstance: AxiosInstance;

    constructor() {
        // Create an instance with default configuration
        this.axiosInstance = axios.create({
            baseURL: 'http://localhost:3000/api',
            timeout: 10000,
            withCredentials: true, // Important for send cookies
            headers: {
                'Content-Type': 'application/json'
            },
        });

        // Interceptor to add the token to the request 
        this.axiosInstance.interceptors.request.use(
            config => {
                const token = Cookies.get('token'); // Get token from cookies
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
                    removeToken();
                    removeRefreshToken();
                    // Logout the user, redirect to login page
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
    public post<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig & { requiresAuth?: boolean }): Promise<AxiosResponse<T>> {
        const requiresAuth = config?.requiresAuth !== false; // Mặc định là true
        
        if(requiresAuth) {
            const token = Cookies.get('token'); // Get token from cookies
            if(!token) {
                console.warn('No auth token found in cookies!');
                return Promise.reject(new Error('Authentication required'));
            }
        }

        return this.axiosInstance.post<T>(url, data, config).catch(error => {
            if (error.response?.status === 404) {
                console.error(`Endpoint not found: ${url}`);
                console.error('Full URL:', this.axiosInstance.defaults.baseURL + url);
            }
            console.error('API request failed:', error);
            throw error;
        })
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
