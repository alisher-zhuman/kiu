import { getTranslations } from "next-intl/server";

import { type AppLocale } from "@/i18n/routing";

import { Documents } from "@/widgets/documents";

interface Props {
  params: Promise<{
    locale: AppLocale;
  }>;
}

const CertificatesAndLicensesPage = async ({ params }: Props) => {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: "Navbar" });
  const tDocs = await getTranslations({ locale, namespace: "DocumentsPage" });

  return (
    <Documents
      allowedDocTypes={["LICENCES_AND_CERTIFICATIONS"]}
      emptyLabel={tDocs("emptyCertificates")}
      errorLabel={tDocs("errorCertificates")}
      title={t("structure.links.certificatesAndLicenses")}
    />
  );
};

export default CertificatesAndLicensesPage;
