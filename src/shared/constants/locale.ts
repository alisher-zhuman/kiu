import { type AppLocale } from "@/i18n/routing";

export const LOCALE_OPTIONS: ReadonlyArray<{
  locale: AppLocale;
  label: string;
  shortLabel: string;
}> = [
  { locale: "ru", label: "Русский", shortLabel: "РУ" },
  { locale: "kg", label: "Кыргызча", shortLabel: "КР" },
  { locale: "en", label: "English", shortLabel: "EN" },
] as const;
