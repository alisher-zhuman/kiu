import { type AppLocale } from "@/i18n/routing";

import { DepartmentPage } from "@/widgets/departments";

import { type ProfessorItem } from "@/entities/professors";
import { getPublicProfessorsBySection } from "@/entities/professors/api/server";

interface Props {
  params: Promise<{
    locale: AppLocale;
  }>;
}

export const PhilologyDepartmentPage = async ({ params }: Props) => {
  const { locale } = await params;
  
  let hasProfessorsError = false;
  let professors: ProfessorItem[] = [];

  try {
    professors = await getPublicProfessorsBySection(locale, "PHILOLOGY");
  } catch {
    hasProfessorsError = true;
  }

  return (
    <DepartmentPage
      hasProfessorsError={hasProfessorsError}
      namespace="PhilologyDepartmentPage"
      professors={professors}
    />
  );
};

export default PhilologyDepartmentPage;
