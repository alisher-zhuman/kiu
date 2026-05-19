import { type AppLocale } from "@/i18n/routing";

import { FacultyPage } from "@/widgets/faculty";

import { type ProfessorItem } from "@/entities/professors";
import { getPublicProfessorsBySection } from "@/entities/professors/api/server";

interface Props {
  params: Promise<{
    locale: AppLocale;
  }>;
}

export const TheologyFacultyPage = async ({ params }: Props) => {
  const { locale } = await params;

  let hasProfessorsError = false;
  let professors: ProfessorItem[] = [];

  try {
    professors = await getPublicProfessorsBySection(locale, "THEOLOGY");
  } catch {
    hasProfessorsError = true;
  }

  return (
    <FacultyPage
      hasProfessorsError={hasProfessorsError}
      namespace="TheologyFacultyPage"
      professors={professors}
    />
  );
};

export default TheologyFacultyPage;
