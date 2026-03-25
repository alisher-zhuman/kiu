import { useTranslations } from "next-intl";

import { InDevelopment } from "@/widgets/in-development";

const StudentsSchedulePage = () => {
  const t = useTranslations("Navbar");

  return <InDevelopment title={t("students.links.schedule")} />;
};

export default StudentsSchedulePage;
