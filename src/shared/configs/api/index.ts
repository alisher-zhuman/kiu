import axios from "axios";

import {
  getCurrentApiLocale,
  getLocalizedApiBaseUrl,
  normalizeApiPath,
} from "@/shared/helpers";
import { useAuthStore } from "@/shared/stores";

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState();
  const locale = getCurrentApiLocale();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (config.url) {
    config.url = normalizeApiPath(config.url);
  }

  config.baseURL = getLocalizedApiBaseUrl(config.baseURL || API_URL, locale);

  return config;
});

let isLoggingOut = false;

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    const status =
      typeof error === "object" && error !== null && "response" in error
        ? (error as { response?: { status?: number } }).response?.status
        : undefined;

    if (status === 401 && !isLoggingOut) {
      isLoggingOut = true;

      const { logOut } = useAuthStore.getState();

      try {
        logOut();
      } finally {
        isLoggingOut = false;
      }
    }

    return Promise.reject(
      error instanceof Error ? error : new Error("API request failed"),
    );
  },
);
