import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { browser } from "$app/environment";
import { ERROR_CODES } from "$lib/utils/constant";
import type { ApiErrorResponse, RetryableRequestConfig } from "./type.dto";
import { PUBLIC_API_BASE_URL, PUBLIC_ENCRYPTION_KEY } from "$env/static/public";
import {
  onLogOff,
  onRegionNotSupported,
  extractLocalStorageInfo,
} from "$lib/utils";

export const createAxiosInstance = (): AxiosInstance => {
  const axiosInstance = axios.create({
    timeout: 20000,
    baseURL: PUBLIC_API_BASE_URL,
    headers: { "Content-Type": "application/json" },
  });

  axiosInstance.interceptors.request.use(
    async (
      req: InternalAxiosRequestConfig
    ): Promise<InternalAxiosRequestConfig> => {
      const extractedData = extractLocalStorageInfo(PUBLIC_ENCRYPTION_KEY);
      if (extractedData?.jwtToken) {
        const token = extractedData.jwtToken;
        if (token && req.headers) {
          req.headers.Authorization = `Bearer ${token}`;
        }
      }

      return req;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  // ── Response interceptor — handle errors ───────────────────────────────────
  axiosInstance.interceptors.response.use(
    // ✅ Pass successful responses straight through
    (response: AxiosResponse) => response,

    // ❌ Handle errors
    async (error: AxiosError<ApiErrorResponse>) => {
      const originalRequest = error.config as RetryableRequestConfig;
      const errorMessage = error.response?.data?.message;
      const status = error.response?.status;

      // ── 1. Region not supported ──────────────────────────────────────────
      if (errorMessage === ERROR_CODES.REGION_NOT_SUPPORTED) {
        onRegionNotSupported();
        return Promise.reject(error);
      }

      // ── 2. Token expired — attempt refresh (once) ────────────────────────
      const isExpiredError =
        status === 401 || errorMessage === ERROR_CODES.TOKEN_HAS_EXPIRED;

      // if (isExpiredError && !originalRequest._retry) {
      if (isExpiredError && browser) onLogOff(true);

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
