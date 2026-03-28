"use client";

import { useLocale, useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";

import { getNews } from "@/entities/news";

import { getApiErrorMessage } from "@/shared/helpers";

import { NewsCard } from "../news-card";

export const AdminNews = () => {
  const locale = useLocale();

  const t = useTranslations("AdminNewsPage");

  const { data, error, isLoading } = useQuery({
    queryKey: ["admin-news", locale],
    queryFn: getNews,
  });

  return (
    <main className="mx-auto max-w-400 px-5 py-8 text-black md:px-10 md:py-10">
      <section aria-labelledby="admin-news-title" className="space-y-8">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#004C97]">
            {t("eyebrow")}
          </p>

          <div className="border-l-2 border-black pl-3 md:pl-4">
            <h1
              id="admin-news-title"
              className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
            >
              {t("title")}
            </h1>
          </div>
        </div>

        {isLoading ? (
          <p className="text-base text-black/60 md:text-lg">{t("loading")}</p>
        ) : null}

        {!isLoading && error ? (
          <p className="text-base text-red-600 md:text-lg">
            {getApiErrorMessage(error, t("error"))}
          </p>
        ) : null}

        {!isLoading && !error && !data?.length ? (
          <p className="text-base text-black/60 md:text-lg">{t("empty")}</p>
        ) : null}

        {data?.length ? (
          <div className="grid gap-5 md:gap-6 xl:grid-cols-2">
            {data.map((item) => (
              <NewsCard key={item.id} item={item} locale={locale} />
            ))}
          </div>
        ) : null}
      </section>
    </main>
  );
};
