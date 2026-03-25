import { useTranslations } from "next-intl";

import { InDevelopment } from "@/widgets/in-development";

const ApplicantsTuitionPage = () => {
  const t = useTranslations("Navbar");

  return <InDevelopment title={t("applicants.links.tuition")} />;
};

export default ApplicantsTuitionPage;
