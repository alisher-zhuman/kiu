import "server-only";

import { type AppLocale } from "@/i18n/routing";

import { API_ROUTES, SERVER_API_URL } from "@/shared/constants";

import { NewsResponseSchema } from "../model/schemas";

const getPublicNewsUrl = (locale: AppLocale) => {
  if (!SERVER_API_URL) {
    throw new Error("API base URL is not configured");
  }

  const normalizedApiUrl = SERVER_API_URL.endsWith("/")
    ? SERVER_API_URL.slice(0, -1)
    : SERVER_API_URL;

  return `${normalizedApiUrl}/${locale}${API_ROUTES.NEWS}`;
};

export const getPublicNews = async (locale: AppLocale) => {
  const response = await fetch(getPublicNewsUrl(locale), {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch news: ${response.status}`);
  }

  const data = await response.json();

  return NewsResponseSchema.parse(data);
};
