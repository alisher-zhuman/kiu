import "server-only";

import { type AppLocale } from "@/i18n/routing";

import { API_ROUTES } from "@/shared/constants";
import { getLocalizedServerApiUrl } from "@/shared/helpers";

import { ProfessorsResponseSchema } from "../model/schemas";

export const getPublicProfessors = async (locale: AppLocale) => {
  const response = await fetch(
    getLocalizedServerApiUrl(API_ROUTES.PROFESSORS, locale),
    {
      next: { revalidate: 60 },
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch professors: ${response.status}`);
  }

  const data = await response.json();

  return ProfessorsResponseSchema.parse(data);
};
