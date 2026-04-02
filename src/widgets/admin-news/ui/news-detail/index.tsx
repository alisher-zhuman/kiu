"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";

import { Link } from "@/i18n/navigation";

import { ArchiveNewsButton } from "@/features/archive-news";
import { DeleteNewsButton } from "@/features/delete-news";

import { getNewsById } from "@/entities/news";

import { QUERY_KEYS } from "@/shared/constants";
import { formatDate, getApiErrorMessage } from "@/shared/helpers";

interface Props {
  id: number;
}

export const AdminNewsDetail = ({ id }: Props) => {
  const locale = useLocale();

  const t = useTranslations("AdminNewsPage");
  const tLayout = useTranslations("Layout");

  const { data: newsItem, error, isLoading } = useQuery({
    queryKey: QUERY_KEYS.adminNewsById(locale, id),
    queryFn: () => getNewsById(id),
  });

  if (isLoading) {
    return (
      <main className="mx-auto max-w-400 px-5 pt-3 pb-8 text-black md:px-10 md:pt-4 md:pb-10">
        <p className="text-base text-black/60 md:text-lg">{t("loading")}</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto max-w-400 px-5 pt-3 pb-8 text-black md:px-10 md:pt-4 md:pb-10">
        <p className="text-base text-red-600 md:text-lg">
          {getApiErrorMessage(error, t("error"))}
        </p>
      </main>
    );
  }

  if (!newsItem) {
    return (
      <main className="mx-auto max-w-400 px-5 pt-3 pb-8 text-black md:px-10 md:pt-4 md:pb-10">
        <p className="text-base text-black/60 md:text-lg">{t("empty")}</p>
      </main>
    );
  }

  const formattedDate = formatDate(newsItem.dateOfPublication, locale);

  return (
    <main className="mx-auto max-w-400 px-5 pt-3 pb-8 text-black md:px-10 md:pt-4 md:pb-10">
      <section className="space-y-6 md:space-y-8">
        <Link
          href="/admin/news"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#004C97] transition-colors hover:text-[#002E5C] md:text-base"
        >
          <ArrowLeft className="size-4" strokeWidth={1.75} />
          {tLayout("back")}
        </Link>

        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-medium text-[#004C97] md:text-base">
              {formattedDate}
            </p>

            {newsItem.archived ? (
              <span className="inline-flex items-center rounded-full bg-[#004C97]/8 px-2.5 py-1 text-xs font-medium text-[#004C97]">
                {t("archive.archived")}
              </span>
            ) : null}
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-black md:text-4xl">
            {newsItem.title}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/admin/news/${newsItem.id}/edit`}
            className="inline-flex items-center justify-center rounded-full border border-[#004C97]/15 bg-[#004C97]/6 px-3 py-1.5 text-xs font-medium text-[#004C97] transition-colors hover:bg-[#004C97]/10 md:text-sm"
          >
            {t("edit.action")}
          </Link>
          <ArchiveNewsButton archived={newsItem.archived} id={newsItem.id} />
          <DeleteNewsButton id={newsItem.id} redirectOnSuccess="/admin/news" />
        </div>

        {newsItem.images.length ? (
          <div className="grid gap-3 md:grid-cols-2 md:gap-4">
            {newsItem.images.map((image, index) => (
              <Image
                key={`${newsItem.id}-${index}`}
                src={image}
                alt={newsItem.title}
                width={1600}
                height={1200}
                loading={index === 0 ? "eager" : "lazy"}
                className="aspect-4/3 w-full rounded-2xl object-cover"
              />
            ))}
          </div>
        ) : null}

        <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-[0_14px_32px_rgba(0,0,0,0.04)] md:p-7">
          <p className="whitespace-pre-line text-sm leading-7 text-black/75 md:text-base md:leading-8">
            {newsItem.description}
          </p>
        </div>
      </section>
    </main>
  );
};
