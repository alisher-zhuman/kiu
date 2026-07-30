import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { type AppLocale } from "@/i18n/routing";

import { NewsDetail } from "@/widgets/news";

import { getPublicNewsById } from "@/entities/news/api/server";

import { SITE_URL } from "@/shared/constants";
import { getPreviewText, toJsonLd } from "@/shared/helpers";

import { buildCanonicalUrl, getPageMetadata } from "../../../helpers";

export const revalidate = 60;

interface Props {
  params: Promise<{
    id: string;
    locale: AppLocale;
  }>;
}

const getValidatedNewsItem = async (locale: AppLocale, id: string) => {
  const newsId = Number(id);

  if (!Number.isInteger(newsId) || newsId <= 0) {
    notFound();
  }

  try {
    return await getPublicNewsById(locale, newsId);
  } catch (error) {
    const status =
      typeof error === "object" && error !== null && "status" in error
        ? (error as { status?: number }).status
        : undefined;

    if (status === 404) {
      notFound();
    }

    return undefined;
  }
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { id, locale } = await params;

  const newsItem = await getValidatedNewsItem(locale, id);
  const path = `/news/${id}`;

  if (!newsItem) {
    return getPageMetadata({ locale, pageKey: "news", path });
  }

  const description = getPreviewText(newsItem.description, 160);
  const imageUrl = newsItem.images[0];

  return getPageMetadata({
    locale,
    pageKey: "news",
    path,
    title: newsItem.title,
    description,
    ...(imageUrl ? { imageUrl } : {}),
  });
};

const NewsDetailPage = async ({ params }: Props) => {
  const { id, locale } = await params;

  setRequestLocale(locale);

  const newsItem = await getValidatedNewsItem(locale, id);
  const hasError = !newsItem;

  const t = await getTranslations({ locale, namespace: "Metadata" });
  const tNavbar = await getTranslations({ locale, namespace: "Navbar" });

  return (
    <>
      {newsItem ? (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: toJsonLd({
                "@context": "https://schema.org",
                "@type": "NewsArticle",
                headline: newsItem.title,
                description: getPreviewText(newsItem.description, 160),
                image: newsItem.images,
                datePublished: newsItem.dateOfPublication,
                author: { "@type": "Organization", name: t("publisher") },
                publisher: {
                  "@type": "Organization",
                  name: t("publisher"),
                  logo: { "@type": "ImageObject", url: `${SITE_URL}/icons/logo.png` },
                },
                mainEntityOfPage: {
                  "@type": "WebPage",
                  "@id": buildCanonicalUrl(locale, `/news/${id}`),
                },
              }),
            }}
          />

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: toJsonLd({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: t("publisher"),
                    item: buildCanonicalUrl(locale),
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: tNavbar("news"),
                    item: buildCanonicalUrl(locale, "/news"),
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: newsItem.title,
                    item: buildCanonicalUrl(locale, `/news/${id}`),
                  },
                ],
              }),
            }}
          />
        </>
      ) : null}

      <NewsDetail hasError={hasError} locale={locale} newsItem={newsItem} />
    </>
  );
};

export default NewsDetailPage;
