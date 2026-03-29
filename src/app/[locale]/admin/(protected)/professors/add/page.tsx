import { getTranslations } from "next-intl/server";

import { InDevelopment } from "@/widgets/in-development";

const AddProfessorPage = async () => {
  const t = await getTranslations("AdminLayout.pages");

  return <InDevelopment compactTopPadding title={t("addProfessors")} />;
};

export default AddProfessorPage;
