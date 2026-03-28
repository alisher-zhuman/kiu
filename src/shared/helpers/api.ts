import { type AppLocale, routing } from "@/i18n/routing";

import { type ApiErrorLike } from "@/shared/types";

import { checkExternalHref } from "./base";

export const getCurrentApiLocale = (): AppLocale => {
  if (typeof window === "undefined") {
    return routing.defaultLocale;
  }

  const currentSegment = window.location.pathname.split("/").filter(Boolean)[0];

  return routing.locales.includes(currentSegment as AppLocale)
    ? (currentSegment as AppLocale)
    : routing.defaultLocale;
};

export const getLocalizedApiBaseUrl = (apiUrl: string, locale: AppLocale) => {
  const normalizedApiUrl = apiUrl.endsWith("/") ? apiUrl.slice(0, -1) : apiUrl;

  if (!normalizedApiUrl) {
    return `/${locale}`;
  }

  return normalizedApiUrl.endsWith(`/${locale}`)
    ? normalizedApiUrl
    : `${normalizedApiUrl}/${locale}`;
};

export const normalizeApiPath = (url: string) => {
  if (checkExternalHref(url)) {
    return url;
  }

  const normalizedUrl = url.startsWith("/") ? url : `/${url}`;
  const localePrefix = routing.locales.find(
    (locale) =>
      normalizedUrl === `/${locale}` || normalizedUrl.startsWith(`/${locale}/`),
  );

  if (!localePrefix) {
    return normalizedUrl;
  }

  return normalizedUrl.replace(`/${localePrefix}`, "") || "/";
};

export const getApiErrorMessage = (
  error: unknown,
  fallback = "Ошибка запроса",
) => {
  if (typeof error === "string") {
    return error;
  }

  const apiError = error as ApiErrorLike | null;
  const message = apiError?.response?.data?.message;

  if (Array.isArray(message)) {
    return message[0] || fallback;
  }

  if (typeof message === "string" && message) {
    return message;
  }

  const responseError = apiError?.response?.data?.error;

  if (responseError) {
    return responseError;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return apiError?.message || fallback;
};
