import { type AppLocale } from "@/i18n/routing";

import { News } from "@/widgets/news";

import { type NewsItem } from "@/entities/news";
import { getPublicNews } from "@/entities/news/api/server";

import { withFallback } from "@/shared/helpers";

interface Props {
  params: Promise<{
    locale: AppLocale;
  }>;
}

const NewsPage = async ({ params }: Props) => {
  const { locale } = await params;

  const { data: news, hasError } = await withFallback<NewsItem[]>(
    () => getPublicNews(locale),
    [],
  );

  return <News hasError={hasError} locale={locale} news={news} />;
};

export default NewsPage;
