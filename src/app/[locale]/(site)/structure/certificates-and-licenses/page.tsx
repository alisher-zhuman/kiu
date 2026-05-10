import { getTranslations } from "next-intl/server";
import { type AppLocale } from "@/i18n/routing";

import { Documents } from "@/widgets/documents";

import { type DocumentItem } from "@/entities/documents";
import { getPublicDocuments } from "@/entities/documents/api/server";

interface Props {
  params: Promise<{
    locale: AppLocale;
  }>;
}

const CertificatesAndLicensesPage = async ({ params }: Props) => {
  const { locale } = await params;

  const t = await getTranslations("Navbar");

  let hasError = false;
  let documents: DocumentItem[] = [];

  try {
    documents = await getPublicDocuments(locale);
  } catch {
    hasError = true;
  }

  return (
    <Documents
      allowedDocTypes={["LICENSES_AND_CERTIFICATES"]}
      documents={documents}
      hasError={hasError}
      title={t("structure.links.certificatesAndLicenses")}
    />
  );
};

export default CertificatesAndLicensesPage;
