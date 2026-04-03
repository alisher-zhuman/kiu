"use client";

import { useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";

import { DOCUMENT_TYPE_OPTIONS, getDocuments } from "@/entities/documents";

import { QUERY_KEYS } from "@/shared/constants";
import { AdminCollectionState } from "@/shared/ui/admin-collection-state";
import { AdminPageShell } from "@/shared/ui/admin-page-shell";

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
    <AdminPageShell ariaLabel={t("sectionLabel")}>
      <AdminCollectionState
        emptyLabel={t("empty")}
        error={error}
        errorLabel={t("error")}
        isEmpty={!documents?.length}
        isLoading={isLoading}
        loadingLabel={t("loading")}
      >
        {groupedDocuments.map(({ docType, items }) =>
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
            )}
      </AdminCollectionState>
    </AdminPageShell>
  );
};
