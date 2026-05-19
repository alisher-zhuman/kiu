import { type AppLocale } from "@/i18n/routing";

import { FacultyPage } from "@/widgets/faculty";

import { type ProfessorItem } from "@/entities/professors";
import { getPublicProfessorsBySection } from "@/entities/professors/api/server";

interface Props {
  params: Promise<{
    locale: AppLocale;
  }>;
}

export const ShariaFacultyPage = async ({ params }: Props) => {
  const { locale } = await params;

  let hasProfessorsError = false;
  let professors: ProfessorItem[] = [];

  try {
    professors = await getPublicProfessorsBySection(locale, "SHARIAT");
  } catch {
    hasProfessorsError = true;
  }

  return (
    <FacultyPage
      hasProfessorsError={hasProfessorsError}
      namespace="ShariaFacultyPage"
      professors={professors}
    />
  );
};

export default ShariaFacultyPage;
