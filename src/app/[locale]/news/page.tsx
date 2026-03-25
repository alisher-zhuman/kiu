import { useTranslations } from "next-intl";

import { InDevelopment } from "@/widgets/in-development";

const NewsPage = () => {
  const t = useTranslations("Navbar");

  return <InDevelopment title={t("news")} />;
};

export default NewsPage;
