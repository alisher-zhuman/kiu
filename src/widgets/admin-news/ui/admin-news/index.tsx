"use client";

import { useLocale, useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";

import { getNews } from "@/entities/news";

import { QUERY_KEYS } from "@/shared/constants";
import { getApiErrorMessage } from "@/shared/helpers";

import { NewsCard } from "../news-card";

export const AdminNews = () => {
  const locale = useLocale();

  const t = useTranslations("AdminNewsPage");

  const { data, error, isLoading } = useQuery({
    queryKey: QUERY_KEYS.adminNews(locale),
    queryFn: getNews,
  });

  return (
    <main className="mx-auto max-w-400 px-5 py-8 text-black md:px-10 md:py-10">
      <section aria-label={t("sectionLabel")} className="space-y-8">
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
          <div className="grid items-stretch gap-5 md:gap-6 xl:grid-cols-2">
            {data.map((item, index) => (
              <NewsCard
                key={item.id}
                cardIndex={index}
                item={item}
                locale={locale}
              />
            ))}
          </div>
        ) : null}
      </section>
    </main>
  );
};
