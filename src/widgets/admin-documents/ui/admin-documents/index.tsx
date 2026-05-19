"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";

import { DOCUMENT_TYPE_OPTIONS, getDocuments } from "@/entities/documents";

import { QUERY_KEYS } from "@/shared/constants";
import { AdminCollectionState } from "@/shared/ui/admin-collection-state";
import { AdminPageShell } from "@/shared/ui/admin-page-shell";

import { DocumentsMobileTabs } from "@/widgets/documents/ui/documents-mobile-tabs";
import { DocumentsSidebar } from "@/widgets/documents/ui/documents-sidebar";

import { DocumentCard } from "../document-card";

export const AdminDocuments = () => {
  const locale = useLocale();

  const t = useTranslations("AdminDocumentsPage");
  const tDocTypes = useTranslations("AdminDocumentsPage.addForm");

  const [activeKey, setActiveKey] = useState<string>(DOCUMENT_TYPE_OPTIONS[0]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    const tab = tabRefs.current[DOCUMENT_TYPE_OPTIONS.indexOf(activeKey as typeof DOCUMENT_TYPE_OPTIONS[number])];
    if (!container || !tab) return;

    const containerCenter = container.offsetWidth / 2;
    const tabCenter = tab.offsetLeft + tab.offsetWidth / 2;
    container.scrollTo({ left: tabCenter - containerCenter, behavior: "smooth" });
  }, [activeKey]);

  const { data: documents, error, isLoading } = useQuery({
    queryKey: QUERY_KEYS.adminDocuments(locale),
    queryFn: getDocuments,
  });

  const tabs = useMemo(
    () => DOCUMENT_TYPE_OPTIONS.map((key) => ({ key, label: tDocTypes(`docTypes.${key}`) })),
    [tDocTypes],
  );

  const activeItems = useMemo(
    () => documents?.filter((item) => item.docType === activeKey) ?? [],
    [documents, activeKey],
  );

  return (
    <AdminPageShell ariaLabel={t("sectionLabel")}>
      <DocumentsMobileTabs
        activeKey={activeKey}
        label={t("sectionLabel")}
        onSelect={setActiveKey}
        scrollContainerRef={scrollContainerRef}
        tabRefs={tabRefs}
        tabs={tabs}
      />

      <div className="md:flex md:items-start md:gap-10">
        <div className="min-w-0 flex-1">
          <AdminCollectionState
            emptyLabel={t("empty")}
            error={error}
            errorLabel={t("error")}
            isEmpty={!activeItems.length}
            isLoading={isLoading}
            loadingLabel={t("loading")}
          >
            <div className="grid items-stretch gap-3 md:gap-4 lg:grid-cols-2 xl:grid-cols-3">
              {activeItems.map((item) => (
                <DocumentCard key={item.id} item={item} />
              ))}
            </div>
          </AdminCollectionState>
        </div>

        <div className="hidden md:block">
          <DocumentsSidebar
            activeKey={activeKey}
            label={t("sectionLabel")}
            onSelect={setActiveKey}
            tabs={tabs}
          />
        </div>
      </div>
    </AdminPageShell>
  );
};
