import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { type AppLocale } from "@/i18n/routing";

import { News } from "@/widgets/news";

import { type NewsItem } from "@/entities/news";
import { getPublicNews } from "@/entities/news/api/server";

import { fetchSafely } from "@/shared/helpers";

import { getPageMetadata } from "../../helpers";

export const revalidate = 60;

interface Props {
  params: Promise<{
    locale: AppLocale;
  }>;
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { locale } = await params;

  return getPageMetadata({ locale, pageKey: "news", path: "/news" });
};

const NewsPage = async ({ params }: Props) => {
  const { locale } = await params;

  setRequestLocale(locale);

  const { data: news, hasError } = await fetchSafely<NewsItem[]>(() => getPublicNews(locale), []);

  return <News hasError={hasError} locale={locale} news={news} />;
};

export default NewsPage;
