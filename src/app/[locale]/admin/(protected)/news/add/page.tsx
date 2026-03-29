import { getTranslations } from "next-intl/server";

import { InDevelopment } from "@/widgets/in-development";

const AddNewsPage = async () => {
  const t = await getTranslations("AdminLayout.pages");

  return <InDevelopment title={t("addNews")} />;
};

export default AddNewsPage;
