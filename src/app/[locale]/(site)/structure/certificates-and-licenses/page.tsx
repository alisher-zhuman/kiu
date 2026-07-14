import { getTranslations, setRequestLocale } from "next-intl/server";

import { type AppLocale } from "@/i18n/routing";

import { Documents } from "@/widgets/documents";

import { type DocumentItem } from "@/entities/documents";
import { getPublicDocumentsByType } from "@/entities/documents/api/server";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ locale: AppLocale }>;
}

const CertificatesAndLicensesPage = async ({ params }: Props) => {
  const { locale } = await params;

  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Navbar" });
  const tDocs = await getTranslations({ locale, namespace: "DocumentsPage" });

  let hasError = false;
  let documents: DocumentItem[] = [];

  try {
    documents = await getPublicDocumentsByType(locale, "LICENCES_AND_CERTIFICATIONS");
  } catch {
    hasError = true;
  }

  return (
    <Documents
      allowedDocTypes={["LICENCES_AND_CERTIFICATIONS"]}
      documents={documents}
      emptyLabel={tDocs("emptyCertificates")}
      errorLabel={tDocs("errorCertificates")}
      hasError={hasError}
      title={t("structure.links.certificatesAndLicenses")}
    />
  );
};

export default CertificatesAndLicensesPage;
