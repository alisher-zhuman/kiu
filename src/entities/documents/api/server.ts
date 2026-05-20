import "server-only";

import { type AppLocale } from "@/i18n/routing";

import { API_ROUTES } from "@/shared/constants";
import { getLocalizedServerApiUrl } from "@/shared/helpers";

import { DocumentsResponseSchema } from "../model/schemas";

export const getPublicDocuments = async (locale: AppLocale) => {
  const response = await fetch(
    getLocalizedServerApiUrl(API_ROUTES.DOCUMENTS, locale),
    {
      next: { revalidate: 60 },
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch documents: ${response.status}`);
  }

  const data = await response.json();

  return DocumentsResponseSchema.parse(data);
};

export const getPublicDocumentsByType = async (
  locale: AppLocale,
  docType: string,
) => {
  const url = new URL(getLocalizedServerApiUrl(API_ROUTES.DOCUMENTS_BY_TYPE, locale));
  url.searchParams.set("type", docType);

  const response = await fetch(url.toString(), {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch documents: ${response.status}`);
  }

  const data = await response.json();

  return DocumentsResponseSchema.parse(data);
};
