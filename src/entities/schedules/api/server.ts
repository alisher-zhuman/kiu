import "server-only";

import { type AppLocale } from "@/i18n/routing";

import { API_ROUTES, SERVER_FETCH_TIMEOUT_MS } from "@/shared/constants";
import { getLocalizedServerApiUrl } from "@/shared/helpers";

import { SchedulesResponseSchema } from "../model/schemas";

export const getPublicSchedulesByLevel = async (
  locale: AppLocale,
  level: string,
  section: string
) => {
  const baseUrl = getLocalizedServerApiUrl(API_ROUTES.SCHEDULES, locale);
  const url = new URL(`${baseUrl}/all/${level}`);
  url.searchParams.set("section", section);

  const response = await fetch(url.toString(), {
    next: { revalidate: 60 },
    signal: AbortSignal.timeout(SERVER_FETCH_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch schedules: ${response.status}`);
  }

  const data = await response.json();

  return SchedulesResponseSchema.parse(data);
};
