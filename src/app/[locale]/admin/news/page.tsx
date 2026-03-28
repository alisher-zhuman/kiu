import { getTranslations } from "next-intl/server";

import { InDevelopment } from "@/widgets/in-development";

interface Props {
  params: Promise<{ locale: string }>;
}

const NewsPage = async ({ params }: Props) => {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "AdminLayout.navigation",
  });

  return <InDevelopment title={t("news")} />;
};

export default NewsPage;
