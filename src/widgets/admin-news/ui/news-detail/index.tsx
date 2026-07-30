"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";

import { Link } from "@/i18n/navigation";

import { ArchiveNewsButton } from "@/features/archive-news";
import { DeleteNewsButton } from "@/features/delete-news";

import { getNewsById } from "@/entities/news";

import { QUERY_KEYS } from "@/shared/constants";
import { formatDate } from "@/shared/helpers";
import { AdminPageShell } from "@/shared/ui/admin-page-shell";
import { AsyncItemState } from "@/shared/ui/async-item-state";

interface Props {
  id: number;
}

export const AdminNewsDetail = ({ id }: Props) => {
  const locale = useLocale();

  const t = useTranslations("AdminNewsPage");

  const {
    data: newsItem,
    error,
    isLoading,
  } = useQuery({
    queryKey: QUERY_KEYS.adminNewsById(locale, id),
    queryFn: () => getNewsById(id),
  });

  return (
    <AdminPageShell backHref="/admin/news" sectionClassName="space-y-6 md:space-y-8">
      <AsyncItemState
        emptyLabel={t("empty")}
        error={error}
        errorLabel={t("error")}
        isLoading={isLoading}
        item={newsItem}
        loadingLabel={t("loading")}
        render={(item) => {
          const formattedDate = formatDate(item.dateOfPublication, locale);

          return (
            <>
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-medium text-[#004C97] md:text-base">{formattedDate}</p>

                  {item.archived ? (
                    <span className="inline-flex items-center rounded-full bg-[#004C97]/8 px-2.5 py-1 text-xs font-medium text-[#004C97]">
                      {t("archive.archived")}
                    </span>
                  ) : null}
                </div>

                <h1 className="text-2xl font-semibold tracking-tight text-black md:text-4xl">
                  {item.title}
                </h1>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={`/admin/news/${item.id}/edit`}
                  className="inline-flex items-center justify-center rounded-full border border-[#004C97]/15 bg-[#004C97]/6 px-3 py-1.5 text-xs font-medium text-[#004C97] transition-colors hover:bg-[#004C97]/10 md:text-sm"
                >
                  {t("edit.action")}
                </Link>
                <ArchiveNewsButton archived={item.archived} id={item.id} />
                <DeleteNewsButton id={item.id} redirectOnSuccess="/admin/news" />
              </div>

              {item.images.length ? (
                <div className="grid gap-3 md:grid-cols-2 md:gap-4">
                  {item.images.map((image, index) => (
                    <Image
                      key={`${item.id}-${index}`}
                      src={image}
                      alt={item.title}
                      width={1600}
                      height={1200}
                      sizes="(min-width: 768px) 50vw, 100vw"
                      loading={index === 0 ? "eager" : "lazy"}
                      className="aspect-4/3 w-full rounded-2xl object-cover"
                    />
                  ))}
                </div>
              ) : null}

              <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-[0_14px_32px_rgba(0,0,0,0.04)] md:p-7">
                <p className="whitespace-pre-line text-sm leading-7 text-black/75 md:text-base md:leading-8">
                  {item.description}
                </p>
              </div>
            </>
          );
        }}
      />
    </AdminPageShell>
  );
};
