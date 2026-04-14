import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";
import authEndpoints from "../api/auth.api";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";

const getToken = () => Cookies.get("token");
const getRefreshToken = () => Cookies.get("refreshToken");
const setToken = (token: string) => Cookies.set("token", token);
const removeTokens = () => {
  Cookies.remove("token");
  Cookies.remove("refreshToken");
};

type Configs<D = unknown> = AxiosRequestConfig<D> & {
  requiresAuth?: boolean;
  _retry?: boolean;
};

class HttpService {
  private instance: AxiosInstance;

  constructor() {
    // Create an instance with default configuration
    this.instance = axios.create({
      baseURL: BASE_URL,
      timeout: 10000,
      withCredentials: true, // Important for send cookies
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // Response interceptor
    this.instance.interceptors.response.use(
      (response) => response,
      async (err) => {
        const originalRequest = err.config as Configs;

        if (
          err.response?.status === 401 &&
          !originalRequest._retry &&
          getRefreshToken()
        ) {
          originalRequest._retry = true;
          try {
            const res = await this.refreshToken();
            const newToken = res.data.accessToken;

            setToken(newToken);

            // retry original request
            return this.instance(originalRequest);
          } catch (refreshError) {
            removeTokens();
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(err);
      },
    );
  }

  // Refresh token
  private refreshToken() {
    return this.instance.post<{ accessToken: string }>(
      authEndpoints.refreshToken,
      {
        refreshToken: getRefreshToken(),
      },
      {
        requiresAuth: false,
      } as Configs,
    );
  }

  // Generic request method
  request<T, D = unknown>(
    config: AxiosRequestConfig<D>,
  ): Promise<AxiosResponse<T>> {
    return this.instance.request<T>(config);
  }

  // GET
  get<T, P = Record<string, unknown>>(
    url: string,
    params?: P,
    config?: Configs,
  ): Promise<AxiosResponse<T>> {
    return this.request<T>({ method: "GET", url, params, ...config });
  }

  // POST
  post<T, P = Record<string, unknown>>(
    url: string,
    data?: P,
    config?: Configs,
  ): Promise<AxiosResponse<T>> {
    return this.request<T>({ method: "POST", url, data, ...config });
  }

  // PUT
  put<T, P = Record<string, unknown>>(
    url: string,
    data?: P,
    config?: Configs,
  ): Promise<AxiosResponse<T>> {
    return this.request<T>({ method: "PUT", url, data, ...config });
  }
}

export default new HttpService();
