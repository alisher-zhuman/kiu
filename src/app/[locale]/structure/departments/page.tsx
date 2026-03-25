import { useTranslations } from "next-intl";

import { InDevelopment } from "@/widgets/in-development";

const StructureDepartmentsPage = () => {
  const t = useTranslations("Navbar");

  return <InDevelopment title={t("structure.links.departments")} />;
};

export default StructureDepartmentsPage;
