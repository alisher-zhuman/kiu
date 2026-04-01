import { useTranslations } from "next-intl";

import { type NewsItem } from "@/entities/news";

import { Reveal } from "@/shared/ui/reveal";

import { NewsCard } from "../news-card";

interface Props {
  hasError?: boolean;
  locale: string;
  news: NewsItem[];
}

export const News = ({ hasError = false, locale, news }: Props) => {
  const t = useTranslations("NewsPage");
  const description = t("description");

  return (
    <main className="mx-auto max-w-400 px-5 py-10 text-black md:px-10 md:py-16">
      <section className="space-y-10 md:space-y-12">
        <Reveal>
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#004C97]">
              {t("eyebrow")}
            </p>

            <div className="border-l-2 border-black pl-3 md:pl-4">
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-5xl">
                {t("title")}
              </h1>
            </div>

            {description ? (
              <p className="max-w-3xl text-base leading-8 text-black/70 md:text-lg">
                {description}
              </p>
            ) : null}
          </div>
        </Reveal>

        {hasError ? (
          <Reveal delay={50}>
            <div className="rounded-3xl border border-red-200 bg-red-50 px-5 py-4 text-base text-red-600 md:px-6 md:py-5 md:text-lg">
              {t("error")}
            </div>
          </Reveal>
        ) : null}

        {!hasError && !news.length ? (
          <Reveal delay={50}>
            <div className="rounded-3xl border border-black/10 bg-white px-5 py-10 text-center text-base text-black/60 shadow-[0_14px_32px_rgba(0,0,0,0.04)] md:px-6 md:py-12 md:text-lg">
              {t("empty")}
            </div>
          </Reveal>
        ) : null}

        {news.length ? (
          <div className="grid items-stretch gap-6 md:gap-7 xl:grid-cols-2">
            {news.map((item, index) => (
              <Reveal
                key={item.id}
                delay={Math.min(index * 50, 200)}
                className="h-full"
              >
                <NewsCard item={item} locale={locale} />
              </Reveal>
            ))}
          </div>
        ) : null}
      </section>
    </main>
  );
};
