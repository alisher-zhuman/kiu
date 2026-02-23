import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["kg", "ru", "en"],
  defaultLocale: "kg",
});

export type AppLocale = (typeof routing.locales)[number];
