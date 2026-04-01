import "server-only";

import { type AppLocale } from "@/i18n/routing";

import { API_ROUTES } from "@/shared/constants";
import { getLocalizedServerApiUrl } from "@/shared/helpers";

import { NewsItemSchema, NewsResponseSchema } from "../model/schemas";

export const getPublicNews = async (locale: AppLocale) => {
  const response = await fetch(getLocalizedServerApiUrl(API_ROUTES.NEWS, locale), {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch news: ${response.status}`);
  }

  const data = await response.json();

  return NewsResponseSchema.parse(data);
};

export const getPublicNewsById = async (locale: AppLocale, id: number) => {
  const response = await fetch(
    getLocalizedServerApiUrl(`${API_ROUTES.NEWS}/${id}`, locale),
    {
      next: { revalidate: 60 },
    },
  );

  if (!response.ok) {
    const error = new Error(`Failed to fetch news item: ${response.status}`) as Error & {
      status?: number;
    };

    error.status = response.status;

    throw error;
  }

  const data = await response.json();

  return NewsItemSchema.parse(data);
};
