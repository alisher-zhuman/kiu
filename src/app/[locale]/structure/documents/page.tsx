import { useTranslations } from "next-intl";

import { InDevelopment } from "@/widgets/in-development";

const StructureDocumentsPage = () => {
  const t = useTranslations("Navbar");

  return <InDevelopment title={t("structure.links.documents")} />;
};

export default StructureDocumentsPage;
