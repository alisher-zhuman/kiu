import { type AppLocale } from "@/i18n/routing";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const OPEN_GRAPH_LOCALES: Record<AppLocale, string> = {
  kg: "ky_KG",
  ru: "ru_RU",
  en: "en_US",
};
