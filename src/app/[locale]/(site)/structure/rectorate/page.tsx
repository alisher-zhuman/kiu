import { useTranslations } from "next-intl";

import { InDevelopment } from "@/widgets/in-development";

const RectoratePage = () => {
  const t = useTranslations("Navbar");

  return <InDevelopment title={t("structure.links.rectorate")} />;
};

export default RectoratePage;
