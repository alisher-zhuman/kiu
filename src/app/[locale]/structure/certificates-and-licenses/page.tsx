import { useTranslations } from "next-intl";

import { InDevelopment } from "@/widgets/in-development";

const CertificatesAndLicensesPage = () => {
  const t = useTranslations("Navbar");

  return <InDevelopment title={t("structure.links.certificatesAndLicenses")} />;
};

export default CertificatesAndLicensesPage;
