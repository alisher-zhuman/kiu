"use client";

import { useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";

import { DOCUMENT_TYPE_OPTIONS, getDocuments } from "@/entities/documents";

import { QUERY_KEYS } from "@/shared/constants";
import { getApiErrorMessage } from "@/shared/helpers";

import { DocumentCard } from "../document-card";

export const AdminDocuments = () => {
  const locale = useLocale();

  const t = useTranslations("AdminDocumentsPage");
  const tDocTypes = useTranslations("AdminDocumentsPage.addForm");

  const { data: documents, error, isLoading } = useQuery({
    queryKey: QUERY_KEYS.adminDocuments(locale),
    queryFn: getDocuments,
  });

  const groupedDocuments = useMemo(
    () =>
      DOCUMENT_TYPE_OPTIONS.map((docType) => ({
        docType,
        items: documents?.filter((item) => item.docType === docType) ?? [],
      })),
    [documents],
  );

  return (
    <main className="mx-auto max-w-400 px-5 pt-3 pb-8 text-black md:px-10 md:pt-4 md:pb-10">
      <section aria-label={t("sectionLabel")} className="space-y-8">
        {isLoading ? (
          <p className="text-base text-black/60 md:text-lg">{t("loading")}</p>
        ) : null}

        {!isLoading && error ? (
          <p className="text-base text-red-600 md:text-lg">
            {getApiErrorMessage(error, t("error"))}
          </p>
        ) : null}

        {!isLoading && !error && !documents?.length ? (
          <p className="text-base text-black/60 md:text-lg">{t("empty")}</p>
        ) : null}

        {documents?.length
          ? groupedDocuments.map(({ docType, items }) =>
              items.length ? (
                <div key={docType} className="space-y-4">
                  <h2 className="text-xl font-semibold tracking-tight text-black md:text-2xl">
                    {tDocTypes(`docTypes.${docType}`)}
                  </h2>

                  <div className="grid items-stretch gap-3 md:gap-4 lg:grid-cols-2 xl:grid-cols-3">
                    {items.map((item) => (
                      <DocumentCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              ) : null,
            )
          : null}
      </section>
    </main>
  );
};
