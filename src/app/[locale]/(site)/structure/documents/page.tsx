import { type AppLocale } from "@/i18n/routing";

import { Documents } from "@/widgets/documents";

import { type DocumentItem } from "@/entities/documents";
import { getPublicDocuments } from "@/entities/documents/api/server";

import { withFallback } from "@/shared/helpers";

interface Props {
  params: Promise<{ locale: AppLocale }>;
}

const StructureDocumentsPage = async ({ params }: Props) => {
  const { locale } = await params;

  const { data: documents, hasError } = await withFallback<DocumentItem[]>(
    () => getPublicDocuments(locale),
    [],
  );

  return <Documents documents={documents} hasError={hasError} />;
};

export default StructureDocumentsPage;
