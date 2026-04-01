import { type AppLocale } from "@/i18n/routing";

import { News } from "@/widgets/news";

import { type NewsItem } from "@/entities/news";
import { getPublicNews } from "@/entities/news/api/server";

interface Props {
  params: Promise<{
    locale: AppLocale;
  }>;
}

const NewsPage = async ({ params }: Props) => {
  const { locale } = await params;
  
  let hasError = false;
  let news: NewsItem[] = [];

  try {
    news = await getPublicNews(locale);
  } catch {
    hasError = true;
  }

  return <News hasError={hasError} locale={locale} news={news} />;
};

export default NewsPage;
