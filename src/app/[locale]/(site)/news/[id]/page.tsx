import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { type AppLocale } from "@/i18n/routing";

import { NewsDetail } from "@/widgets/news";

import { type NewsItem } from "@/entities/news";
import { getPublicNewsById } from "@/entities/news/api/server";

export const revalidate = 60;

interface Props {
  params: Promise<{
    id: string;
    locale: AppLocale;
  }>;
}

const NewsDetailPage = async ({ params }: Props) => {
  const { id, locale } = await params;

  setRequestLocale(locale);

  const newsId = Number(id);
  let hasError = false;
  let newsItem: NewsItem | undefined;

  if (!Number.isInteger(newsId) || newsId <= 0) {
    notFound();
  }

  try {
    newsItem = await getPublicNewsById(locale, newsId);
  } catch (error) {
    const status =
      typeof error === "object" && error !== null && "status" in error
        ? (error as { status?: number }).status
        : undefined;

    if (status === 404) {
      notFound();
    }
    
    hasError = true;
  }

  return <NewsDetail hasError={hasError} locale={locale} newsItem={newsItem} />;
};

export default NewsDetailPage;
