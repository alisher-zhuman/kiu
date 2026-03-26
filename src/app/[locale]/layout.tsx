import "../globals.css";

import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";

import { routing } from "@/i18n/routing";

import { ToastProvider } from "@/shared/providers";

import { getMetadata } from "./helpers/metadata";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-montserrat",
});

export const generateStaticParams = () => {
  return routing.locales.map((locale) => ({ locale }));
};

type Props = Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>;

export const generateMetadata = async ({
  params,
}: Omit<Props, "children">): Promise<Metadata> => {
  const { locale } = await params;
  const metadataLocale = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;

  return getMetadata(metadataLocale);
};

const LocaleLayout = async ({ children, params }: Props) => {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body className={montserrat.variable}>
        <NextIntlClientProvider>
          <ToastProvider />
          
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
