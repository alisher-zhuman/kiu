import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { type AppLocale } from "@/i18n/routing";

import { SITE_URL } from "@/shared/constants";

import { OPEN_GRAPH_LOCALES } from "../constants";

export const buildCanonicalUrl = (locale: AppLocale, path = "") => `${SITE_URL}/${locale}${path}`;

interface PageMetadataOptions {
  description?: string;
  imageUrl?: string;
  locale: AppLocale;
  pageKey: string;
  path?: string;
  title?: string;
}

export const getPageMetadata = async ({
  description,
  imageUrl,
  locale,
  pageKey,
  path = "",
  title,
}: PageMetadataOptions): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  const pageTitle = title ?? t(`pages.${pageKey}.title`);
  const pageDescription = description ?? t(`pages.${pageKey}.description`);
  const canonical = buildCanonicalUrl(locale, path);

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: canonical,
      siteName: t("publisher"),
      images: imageUrl ? [{ url: imageUrl, alt: pageTitle }] : undefined,
      locale: OPEN_GRAPH_LOCALES[locale],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
};

export const getMetadata = async (locale: AppLocale): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: t.raw("keywords") as string[],
    authors: [
      {
        name: t("author"),
        url: "https://www.linkedin.com/in/alisher-zhuman",
      },
    ],
    creator: t("publisher"),
    publisher: t("publisher"),
    metadataBase: new URL(SITE_URL),
    openGraph: {
      title: t("openGraph.title"),
      description: t("openGraph.description"),
      url: buildCanonicalUrl(locale),
      siteName: t("openGraph.siteName"),
      locale: OPEN_GRAPH_LOCALES[locale],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("twitter.title"),
      description: t("twitter.description"),
    },
    alternates: {
      canonical: buildCanonicalUrl(locale),
    },
  };
};
