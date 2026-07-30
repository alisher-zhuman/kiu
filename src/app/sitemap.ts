import type { MetadataRoute } from "next";

import { type AppLocale, routing } from "@/i18n/routing";

import { getPublicNews } from "@/entities/news/api/server";

import { SITE_URL } from "@/shared/constants";

const STATIC_PATHS = [
  "",
  "/news",
  "/history",
  "/science",
  "/courses",
  "/applicants",
  "/applicants/tuition",
  "/applicants/required-documents",
  "/students/schedule",
  "/students/tuition",
  "/structure/rectorate",
  "/structure/departments",
  "/structure/documents",
  "/structure/certificates-and-licenses",
  "/faculty/theology",
  "/faculty/philology",
  "/faculty/sharia",
] as const;

const buildUrl = (locale: AppLocale, path: string) => `${SITE_URL}/${locale}${path}`;

const buildAlternates = (path: string) => {
  return Object.fromEntries([
    ...routing.locales.map((locale) => [locale, buildUrl(locale, path)]),
    ["x-default", buildUrl(routing.defaultLocale, path)],
  ]);
};

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: buildUrl(routing.defaultLocale, path),
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
    alternates: {
      languages: buildAlternates(path),
    },
  }));

  try {
    const news = await getPublicNews(routing.defaultLocale);

    const newsEntries: MetadataRoute.Sitemap = news.map((item) => ({
      url: buildUrl(routing.defaultLocale, `/news/${item.id}`),
      lastModified: item.dateOfPublication || now,
      changeFrequency: "weekly",
      priority: 0.7,
      alternates: {
        languages: buildAlternates(`/news/${item.id}`),
      },
    }));

    return [...staticEntries, ...newsEntries];
  } catch {
    return staticEntries;
  }
};

export default sitemap;
