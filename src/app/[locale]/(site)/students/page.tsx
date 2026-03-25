import { useTranslations } from "next-intl";

import { InDevelopment } from "@/widgets/in-development";

const StudentsPage = () => {
  const t = useTranslations("Navbar");

  return <InDevelopment title={t("students.label")} />;
};

export default StudentsPage;
