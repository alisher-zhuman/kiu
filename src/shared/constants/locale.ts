import { type AppLocale } from "@/i18n/routing";

import { type LocaleLabelsMap } from "@/shared/types";

export const LOCALE_OPTIONS: ReadonlyArray<AppLocale> = [
  "kg",
  "ru",
  "en",
] as const;

export const getLocaleLabels = (
  t: (key: string) => string,
): LocaleLabelsMap => {
  return {
    kg: {
      label: t("locales.kg.label"),
      shortLabel: t("locales.kg.shortLabel"),
    },
    ru: {
      label: t("locales.ru.label"),
      shortLabel: t("locales.ru.shortLabel"),
    },
    en: {
      label: t("locales.en.label"),
      shortLabel: t("locales.en.shortLabel"),
    },
  };
};
