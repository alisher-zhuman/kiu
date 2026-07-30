import "server-only";

import { type AppLocale } from "@/i18n/routing";

import { API_ROUTES, SERVER_FETCH_TIMEOUT_MS } from "@/shared/constants";
import { getLocalizedServerApiUrl } from "@/shared/helpers";

import { ProfessorsResponseSchema } from "../model/schemas";
import { type ProfessorSection } from "../model/types";

export const getPublicProfessorsBySection = async (
  locale: AppLocale,
  section: ProfessorSection
) => {
  const url = new URL(getLocalizedServerApiUrl(API_ROUTES.PROFESSORS_BY_SECTION, locale));

  url.searchParams.set("section", section);

  const response = await fetch(url, {
    next: { revalidate: 60 },
    signal: AbortSignal.timeout(SERVER_FETCH_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch professors: ${response.status}`);
  }

  const data = await response.json();

  return ProfessorsResponseSchema.parse(data);
};
