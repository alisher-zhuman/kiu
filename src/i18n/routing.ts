import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["kg", "ru"],
  defaultLocale: "kg",
});

export type AppLocale = (typeof routing.locales)[number];
