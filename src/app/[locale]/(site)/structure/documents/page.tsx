import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";

import { type AppLocale } from "@/i18n/routing";

import { Documents } from "@/widgets/documents";

import { type DocumentItem } from "@/entities/documents";
import { getPublicDocuments } from "@/entities/documents/api/server";

import { fetchSafely } from "@/shared/helpers";

interface Props {
  params: Promise<{ locale: AppLocale }>;
}

const StructureDocumentsPage = async ({ params }: Props) => {
  const { locale } = await params;

  setRequestLocale(locale);

  const { data: documents, hasError } = await fetchSafely<DocumentItem[]>(
    () => getPublicDocuments(locale),
    []
  );

  return (
    <Suspense fallback={null}>
      <Documents documents={documents} hasError={hasError} />
    </Suspense>
  );
};

export default StructureDocumentsPage;
