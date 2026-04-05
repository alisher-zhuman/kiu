import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { type AppLocale } from "@/i18n/routing";

import { OPEN_GRAPH_LOCALES, SITE_URL } from "../constants";

export const getMetadata = async (locale: AppLocale): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
    icons: {
      icon: "/icons/logo.svg",
    },
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
      url: SITE_URL,
      siteName: t("openGraph.siteName"),
      images: [
        {
          url: "/icons/logo.png",
          width: 1200,
          height: 630,
          alt: t("openGraph.imageAlt"),
        },
      ],
      locale: OPEN_GRAPH_LOCALES[locale],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("twitter.title"),
      description: t("twitter.description"),
      images: ["/icons/logo.png"],
    },
    alternates: {
      canonical: SITE_URL,
    },
  };
};
