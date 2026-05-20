import { type AppLocale } from "@/i18n/routing";

import { Documents } from "@/widgets/documents";

import { type DocumentItem } from "@/entities/documents";
import { getPublicDocuments } from "@/entities/documents/api/server";

interface Props {
  params: Promise<{ locale: AppLocale }>;
}

const StructureDocumentsPage = async ({ params }: Props) => {
  const { locale } = await params;

  let hasError = false;
  let documents: DocumentItem[] = [];

  try {
    documents = await getPublicDocuments(locale);
  } catch {
    hasError = true;
  }

  return <Documents documents={documents} hasError={hasError} />;
};

export default StructureDocumentsPage;
