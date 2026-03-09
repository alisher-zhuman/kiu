import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { type AppLocale } from "@/i18n/routing";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const OPEN_GRAPH_LOCALES: Record<AppLocale, string> = {
  kg: "ky_KG",
  ru: "ru_RU",
  en: "en_US",
};

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
        name: "Alisher Zhuman",
        url: "https://www.linkedin.com/in/alisher-zhuman",
      },
    ],
    creator: "Alisher Zhuman",
    publisher: t("publisher"),
    metadataBase: new URL(SITE_URL),
    openGraph: {
      title: t("openGraph.title"),
      description: t("openGraph.description"),
      url: SITE_URL,
      siteName: t("openGraph.siteName"),
      images: [
        {
          url: "/icons/logo.svg",
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
      images: ["/icons/logo.svg"],
    },
    alternates: {
      canonical: SITE_URL,
    },
  };
};
