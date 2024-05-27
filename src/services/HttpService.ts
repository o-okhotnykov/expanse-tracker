import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export const BASE_URL = "http://localhost:3004/";

export class HttpService {
  baseUrl: string;

  service: AxiosInstance;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.service = axios.create({ baseURL: baseUrl });
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
