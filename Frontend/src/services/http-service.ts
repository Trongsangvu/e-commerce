import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import authEndpoints from "../api/auth.api";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";

const getToken = () => Cookies.get("token");
const getRefreshToken = () => Cookies.get("refreshToken");

const setToken = (token: string) => {
  Cookies.set("token", token);
};

const removeTokens = () => {
  Cookies.remove("token");
  Cookies.remove("refreshToken");
};

type Configs<D = unknown> = AxiosRequestConfig<D> & {
  requiresAuth?: boolean;
  _retry?: boolean;
};

type InternalConfigs<D = unknown> =
  InternalAxiosRequestConfig<D> & {
    requiresAuth?: boolean;
    _retry?: boolean;
  };

interface FailedQueue {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
};

class HttpService {
  private instance: AxiosInstance;

  private refreshInstance: AxiosInstance;

  private isRefreshing = false;

  private failedQueue: FailedQueue[] = [];

  constructor() {
    this.instance = axios.create({
      baseURL: BASE_URL,
      timeout: 5000,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // separate instance
    this.refreshInstance = axios.create({
      baseURL: BASE_URL,
      timeout: 5000,
      withCredentials: true,
    });

    this.setupInterceptors();
  }

  private processQueue(
    error: unknown,
    token?: string
  ) {
    this.failedQueue.forEach((request) => {
      if (error || !token) {
        request.reject(error ?? new Error("Refresh token failed"));
      } else {
        request.resolve(token);
      }
    });

    this.failedQueue = [];
  }

  private setupInterceptors() {
    // Request interceptor
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const customConfig = config as InternalConfigs;

        const token = customConfig.requiresAuth === false ? null : getToken();

        if (token) {
          config.headers.set("Authorization", `Bearer ${token}`);
        } else {
          config.headers.delete("Authorization");
        }

        return config;
      },

      (error: AxiosError) => Promise.reject(error),
    );

    // Response interceptor
    this.instance.interceptors.response.use(
      (response) => response,

      async (error: AxiosError) => {
        const originalRequest = error.config as Configs;

        if (!originalRequest) {
          return Promise.reject(error);
        }

        const isUnauthorized = error.response?.status === 401;

        const hasRefreshToken = !!getRefreshToken();

        const isRefreshCall = originalRequest.url?.includes(
          authEndpoints.refreshToken,
        );

        if (
          isUnauthorized &&
          originalRequest.requiresAuth !== false &&
          !originalRequest._retry &&
          hasRefreshToken &&
          !isRefreshCall
        ) {
          // queue while refreshing
          if (this.isRefreshing) {
            return new Promise((resolve, reject) => {
              this.failedQueue.push({
                resolve: (token) => {
                  originalRequest.headers = {
                    ...originalRequest.headers,
                    Authorization: `Bearer ${token}`,
                  };

                  resolve(this.instance(originalRequest));
                },

                reject,
              });
            });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            const response = await this.refreshToken();
            const newToken = response.data.accessToken;

            setToken(newToken);

            this.processQueue(null, newToken);

            originalRequest.headers = {
              ...originalRequest.headers,
              Authorization: `Bearer ${newToken}`,
            };

            return this.instance(originalRequest);
          } catch (refreshError) {
            this.processQueue(refreshError);

            removeTokens();

            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        return Promise.reject(error);
      },
    );
  }

  private refreshToken() {
    return this.refreshInstance.post<{
      accessToken: string;
    }>(
      authEndpoints.refreshToken,
      {
        refreshToken: getRefreshToken(),
      },
    );
  }

  request<T, D = unknown>(
    config: Configs<D>,
  ): Promise<AxiosResponse<T>> {
    return this.instance.request<T, AxiosResponse<T>, D>(config);
  }

  get<T, P = Record<string, unknown>>(
    url: string,
    params?: P,
    config?: Configs,
  ) {
    return this.request<T>({
      method: "GET",
      url,
      params,
      ...config,
    });
  }

  post<T, P = Record<string, unknown>>(
    url: string,
    data?: P,
    config?: Configs,
  ) {
    return this.request<T>({
      method: "POST",
      url,
      data,
      ...config,
    });
  }

  put<T, P = Record<string, unknown>>(
    url: string,
    data?: P,
    config?: Configs,
  ) {
    return this.request<T>({
      method: "PUT",
      url,
      data,
      ...config,
    });
  }

  delete<T, P = Record<string, unknown>>(
    url: string,
    params?: P,
    config?: Configs,
  ) {
    return this.request<T>({
      method: "DELETE",
      url,
      params,
      ...config,
    });
  }
}

const httpService = new HttpService();

export default httpService;