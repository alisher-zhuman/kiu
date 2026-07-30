"use client";

import { useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";

import { DOCUMENT_TYPE_OPTIONS, getDocumentsByType } from "@/entities/documents";

import { QUERY_KEYS } from "@/shared/constants";
import { useSearchParamState } from "@/shared/hooks";
import { AdminCollectionState } from "@/shared/ui/admin-collection-state";
import { AdminPageShell } from "@/shared/ui/admin-page-shell";
import { AdminSidebarLayout } from "@/shared/ui/admin-sidebar-layout";
import { FilterSelect } from "@/shared/ui/filter-select";
import { TabSidebar } from "@/shared/ui/tab-sidebar";

import { DocumentCard } from "../document-card";

export const AdminDocuments = () => {
  const [activeKey, setActiveKey] = useSearchParamState(
    "category",
    DOCUMENT_TYPE_OPTIONS[0],
    DOCUMENT_TYPE_OPTIONS
  );

  const locale = useLocale();

  const t = useTranslations("AdminDocumentsPage");
  const tDocTypes = useTranslations("AdminDocumentsPage.addForm");

  const { data, error, isLoading } = useQuery({
    queryKey: QUERY_KEYS.adminDocuments(locale, activeKey),
    queryFn: () => getDocumentsByType(activeKey),
  });

  const tabs = useMemo(
    () =>
      DOCUMENT_TYPE_OPTIONS.map((key) => ({
        key,
        label: tDocTypes(`docTypes.${key}`),
      })),
    [tDocTypes]
  );

  return (
    <AdminPageShell ariaLabel={t("sectionLabel")}>
      <div className="md:hidden">
        <FilterSelect
          value={activeKey}
          onChange={(e) => setActiveKey(e.target.value)}
          className="w-full"
        >
          {tabs.map(({ key, label }) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </FilterSelect>
      </div>

      <AdminSidebarLayout
        sidebar={
          <TabSidebar
            activeKey={activeKey}
            label={t("sectionLabel")}
            onSelect={setActiveKey}
            tabs={tabs}
          />
        }
      >
        <AdminCollectionState
          emptyLabel={t("empty")}
          error={error}
          errorLabel={t("error")}
          isEmpty={!data?.length}
          isLoading={isLoading}
          loadingLabel={t("loading")}
        >
          <div className="grid items-stretch gap-3 md:gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {data?.map((item) => (
              <DocumentCard key={item.id} item={item} />
            ))}
          </div>
        </AdminCollectionState>
      </AdminSidebarLayout>
    </AdminPageShell>
  );
};
