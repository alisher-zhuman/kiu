import { useTranslations } from "next-intl";

import { InDevelopment } from "@/widgets/in-development";

export const LogInPage = () => {
  const t = useTranslations("LogInPage");

  return <InDevelopment title={t("title")} />;
};
