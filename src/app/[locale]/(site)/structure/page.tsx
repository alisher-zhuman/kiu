import { useTranslations } from "next-intl";

import { InDevelopment } from "@/widgets/in-development";

const StructurePage = () => {
  const t = useTranslations("Navbar");

  return <InDevelopment title={t("structure.label")} />;
};

export default StructurePage;
