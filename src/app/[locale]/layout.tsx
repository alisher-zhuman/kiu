import "../globals.css";

import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";

import { routing } from "@/i18n/routing";

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

export const generateMetadata = async ({ params }: Omit<Props, "children">): Promise<Metadata> => {
  const { locale } = await params;
  const metadataLocale = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;

  return getMetadata(metadataLocale);
};

const LocaleLayout = async ({ children, params }: Props) => {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Layout" });

  return (
    <html lang={locale}>
      <body className={montserrat.variable}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-2xl focus:bg-[#004C97] focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-white"
        >
          {t("skipToContent")}
        </a>

        <NextIntlClientProvider>{children}</NextIntlClientProvider>

        <Analytics />
      </body>
    </html>
  );
};

export default LocaleLayout;
