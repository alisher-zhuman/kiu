import { type AppLocale } from "@/i18n/routing";

import { DepartmentPage } from "@/widgets/departments";

import { type ProfessorItem } from "@/entities/professors";
import { getPublicProfessorsBySection } from "@/entities/professors/api/server";

interface Props {
  params: Promise<{
    locale: AppLocale;
  }>;
}

export const ShariaDepartmentPage = async ({ params }: Props) => {
  const { locale } = await params;
  
  let hasProfessorsError = false;
  let professors: ProfessorItem[] = [];

  try {
    professors = await getPublicProfessorsBySection(locale, "SHARIAT");
  } catch {
    hasProfessorsError = true;
  }

  return (
    <DepartmentPage
      hasProfessorsError={hasProfessorsError}
      namespace="ShariaDepartmentPage"
      professors={professors}
    />
  );
};

export default ShariaDepartmentPage;
