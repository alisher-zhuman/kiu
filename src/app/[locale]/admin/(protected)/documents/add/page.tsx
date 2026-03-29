import { getTranslations } from "next-intl/server";

import { InDevelopment } from "@/widgets/in-development";

const AddDocumentPage = async () => {
  const t = await getTranslations("AdminLayout.pages");

  return <InDevelopment title={t("addDocuments")} />;
};

export default AddDocumentPage;
