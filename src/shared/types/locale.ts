import { type AppLocale } from "@/i18n/routing";

export interface LocaleOptionLabels {
  label: string;
  shortLabel: string;
}

export type LocaleLabelsMap = Record<AppLocale, LocaleOptionLabels>;
