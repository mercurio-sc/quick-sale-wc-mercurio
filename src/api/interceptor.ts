import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { AUTH_TOKEN_LOCALSTORAGE_NAME } from "@wc/constants/constants";

/**
 * Axios instance created by Web Component to avoid
 * overriding the global Axios instance.
 */
const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  headers: {
    "X-Api-Key": import.meta.env.VITE_API_KEY,
  },
});

/**
 * Interceptor for modifying the request configuration before it is sent.
 * @param config The request configuration.
 * @returns The modified request configuration.
 */
axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem(AUTH_TOKEN_LOCALSTORAGE_NAME);

  if (!token) {
    throw new Error(
      `[Internal Interceptor]: Authorization token not found in localStorage with key '${AUTH_TOKEN_LOCALSTORAGE_NAME}' of this browser.`
    );
  }

  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/**
 * Interceptor for modifying the response data before it is resolved.
 * @param response The response data.
 * @returns The modified response data.
 */
axiosInstance.interceptors.response.use((response: AxiosResponse) => response); // Modify this function to handle errors, etc.

export default axiosInstance;
