import { ActionAuthTypes } from "@/store/AuthModule/actions";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export const BASE_URL = "http://localhost:3004/";

export class HttpService {
  baseUrl: string;

  service: AxiosInstance;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.service = axios.create({ baseURL: baseUrl });
  }

  authInterceptor(): void {
    this.service.interceptors.request.use(
      async (config) => {
        const { useStore } = await import("@/store");
        const store = useStore();
        const token = store.state.auth.accessToken;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    this.service.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const errorData = error.response.data;
        const errorStatus = error.response.status;
        const { store } = await import("@/store");
        if (errorStatus === 401) {
          store.dispatch(ActionAuthTypes.LOGOUT_USER);
        }

        if (errorData) {
          error.message = errorData;
        }

        return Promise.reject(error);
      }
    );
  }

  request<T>(params: AxiosRequestConfig) {
    return this.service.request(params) as Promise<AxiosResponse<T>>;
  }

  get<T>(path: string, payload?: Partial<AxiosRequestConfig>) {
    return this.request<T>({
      method: "GET",
      url: path,
      responseType: "json",
      ...payload,
    });
  }

  post<T>(path: string, payload: unknown) {
    return this.request<T>({
      method: "POST",
      url: path,
      data: payload,
    });
  }

  patch<T>(path: string, payload: unknown) {
    return this.request<T>({
      method: "PATCH",
      url: path,
      data: payload,
    });
  }

  delete<T>(path: string, payload: Partial<AxiosRequestConfig> = {}) {
    return this.request<T>({
      method: "delete",
      url: path,
      ...payload,
    });
  }
}
