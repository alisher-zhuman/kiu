"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

import {
  DOCUMENT_TYPE_OPTIONS,
  type DocumentItem,
} from "@/entities/documents";

import { Reveal } from "@/shared/ui/reveal";

import { DocumentCard } from "../document-card";
import { DocumentsMobileTabs } from "../documents-mobile-tabs";
import { DocumentsSidebar } from "../documents-sidebar";

interface Props {
  allowedDocTypes?: (typeof DOCUMENT_TYPE_OPTIONS)[number][];
  documents: DocumentItem[];
  emptyLabel?: string;
  errorLabel?: string;
  hasError?: boolean;
  title?: string;
}

export const Documents = ({
  allowedDocTypes,
  documents,
  emptyLabel,
  errorLabel,
  hasError = false,
  title,
}: Props) => {
  const t = useTranslations("DocumentsPage");

  const typesToDisplay = allowedDocTypes ?? DOCUMENT_TYPE_OPTIONS;
  const showTabs = typesToDisplay.length > 1;

  const tabs = typesToDisplay.map((key) => ({
    key,
    label: t(`docTypes.${key}`),
  }));

  const [activeKey, setActiveKey] = useState<string>(typesToDisplay[0]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    const tab = tabRefs.current[typesToDisplay.indexOf(activeKey as typeof typesToDisplay[number])];
    if (!container || !tab) return;

    const containerCenter = container.offsetWidth / 2;
    const tabCenter = tab.offsetLeft + tab.offsetWidth / 2;
    container.scrollTo({ left: tabCenter - containerCenter, behavior: "smooth" });
  }, [activeKey]);

  const activeItems = documents.filter((item) => item.docType === activeKey);

  return (
    <main className="mx-auto max-w-400 px-5 py-10 text-black md:px-10 md:py-16">
      <section className="space-y-8 md:space-y-10">
        <Reveal>
          <div className="border-l-2 border-black pl-3 md:pl-4">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-5xl">
              {title ?? t("title")}
            </h1>
          </div>
        </Reveal>

        {hasError ? (
          <Reveal delay={50}>
            <div className="rounded-3xl border border-red-200 bg-red-50 px-5 py-4 text-base text-red-600 md:px-6 md:py-5 md:text-lg">
              {errorLabel ?? t("error")}
            </div>
          </Reveal>
        ) : null}

        {!hasError && showTabs ? (
          <DocumentsMobileTabs
            activeKey={activeKey}
            label={title ?? t("title")}
            onSelect={setActiveKey}
            scrollContainerRef={scrollContainerRef}
            tabRefs={tabRefs}
            tabs={tabs}
          />
        ) : null}

        {!hasError ? (
          <div className={showTabs ? "md:flex md:items-start md:gap-10" : undefined}>
            <div className="min-w-0 flex-1">
              {!showTabs && !documents.length ? (
                <Reveal delay={50}>
                  <div className="rounded-3xl border border-black/10 bg-white px-5 py-10 text-center text-base text-black/60 shadow-[0_14px_32px_rgba(0,0,0,0.04)] md:px-6 md:py-12 md:text-lg">
                    {emptyLabel ?? t("empty")}
                  </div>
                </Reveal>
              ) : null}

              {showTabs && !activeItems.length ? (
                <div className="rounded-3xl border border-black/10 bg-white px-5 py-10 text-center text-base text-black/60 shadow-[0_14px_32px_rgba(0,0,0,0.04)] md:px-6 md:py-12 md:text-lg">
                  {emptyLabel ?? t("empty")}
                </div>
              ) : null}

              {showTabs && activeItems.length ? (
                <div className="grid items-stretch gap-3 md:gap-4 lg:grid-cols-2">
                  {activeItems.map((item) => (
                    <DocumentCard key={item.id} item={item} />
                  ))}
                </div>
              ) : null}

              {!showTabs && documents.length ? (
                <div className="grid items-stretch gap-3 md:gap-4 lg:grid-cols-2 xl:grid-cols-3">
                  {documents.map((item) => (
                    <DocumentCard key={item.id} item={item} />
                  ))}
                </div>
              ) : null}
            </div>

            {showTabs ? (
              <div className="hidden md:block">
                <DocumentsSidebar
                  activeKey={activeKey}
                  label={title ?? t("title")}
                  onSelect={setActiveKey}
                  tabs={tabs}
                />
              </div>
            ) : null}
          </div>
        ) : null}
      </section>
    </main>
  );
};
