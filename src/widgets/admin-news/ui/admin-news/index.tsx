"use client";

import { useLocale, useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";

import { getNews } from "@/entities/news";

import { QUERY_KEYS } from "@/shared/constants";
import { AdminCollectionState } from "@/shared/ui/admin-collection-state";
import { AdminPageShell } from "@/shared/ui/admin-page-shell";

import { NewsCard } from "../news-card";

export const AdminNews = () => {
  const locale = useLocale();

  const t = useTranslations("AdminNewsPage");

  const { data: news, error, isLoading } = useQuery({
    queryKey: QUERY_KEYS.adminNews(locale),
    queryFn: getNews,
  });

  const newsItems = news ?? [];

  return (
    <AdminPageShell ariaLabel={t("sectionLabel")}>
      <AdminCollectionState
        emptyLabel={t("empty")}
        error={error}
        errorLabel={t("error")}
        isEmpty={!news?.length}
        isLoading={isLoading}
        loadingLabel={t("loading")}
      >
        <div className="grid items-stretch gap-5 md:gap-6 xl:grid-cols-2">
          {newsItems.map((item, index) => (
            <NewsCard
              key={item.id}
              cardIndex={index}
              item={item}
              locale={locale}
            />
          ))}
        </div>
      </AdminCollectionState>
    </AdminPageShell>
  );
};
