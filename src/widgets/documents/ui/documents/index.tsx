import { useTranslations } from "next-intl";

import {
  DOCUMENT_TYPE_OPTIONS,
  type DocumentItem,
} from "@/entities/documents";

import { Reveal } from "@/shared/ui/reveal";

import { DocumentCard } from "../document-card";

interface Props {
  allowedDocTypes?: (typeof DOCUMENT_TYPE_OPTIONS)[number][];
  documents: DocumentItem[];
  hasError?: boolean;
  title?: string;
}

export const Documents = ({
  allowedDocTypes,
  documents,
  hasError = false,
  title,
}: Props) => {
  const t = useTranslations("DocumentsPage");

  const typesToDisplay = allowedDocTypes ?? DOCUMENT_TYPE_OPTIONS;

  const groupedDocuments = typesToDisplay.map((docType) => ({
    docType,
    items: documents.filter((item) => item.docType === docType),
  }));

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
              {t("error")}
            </div>
          </Reveal>
        ) : null}

        {!hasError && !documents.length ? (
          <Reveal delay={50}>
            <div className="rounded-3xl border border-black/10 bg-white px-5 py-10 text-center text-base text-black/60 shadow-[0_14px_32px_rgba(0,0,0,0.04)] md:px-6 md:py-12 md:text-lg">
              {t("empty")}
            </div>
          </Reveal>
        ) : null}

        {!hasError
          ? groupedDocuments.map(({ docType, items }, sectionIndex) =>
              items.length ? (
                <Reveal key={docType} delay={Math.min(sectionIndex * 50, 150)}>
                  <section className="space-y-4 md:space-y-5">
                    <h2 className="text-xl font-semibold tracking-tight text-black md:text-2xl">
                      {t(`docTypes.${docType}`)}
                    </h2>

                    <div className="grid items-stretch gap-3 md:gap-4 lg:grid-cols-2 xl:grid-cols-3">
                      {items.map((item) => (
                        <DocumentCard key={item.id} item={item} />
                      ))}
                    </div>
                  </section>
                </Reveal>
              ) : null,
            )
          : null}
      </section>
    </main>
  );
};
