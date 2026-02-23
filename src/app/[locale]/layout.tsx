import "../globals.css";

import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";

import { routing } from "@/i18n/routing";

import { METADATA } from "@shared/constants";

export const metadata: Metadata = METADATA;

export const generateStaticParams = () => {
  return routing.locales.map((locale) => ({ locale }));
};

type Props = Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>;

const LocaleLayout = async ({ children, params }: Props) => {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
