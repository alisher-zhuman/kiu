import { useTranslations } from "next-intl";

import { InDevelopment } from "@/widgets/in-development";

const StudentsTuitionPage = () => {
  const t = useTranslations("Navbar");

  return <InDevelopment title={t("students.links.tuition")} />;
};

export default StudentsTuitionPage;
