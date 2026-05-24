import { type AppLocale } from "@/i18n/routing";

import { FacultyPage } from "@/widgets/faculty";

import { type ProfessorItem } from "@/entities/professors";
import { getPublicProfessorsBySection } from "@/entities/professors/api/server";

import { fetchSafely } from "@/shared/helpers";

interface Props {
  params: Promise<{
    locale: AppLocale;
  }>;
}

export const TheologyFacultyPage = async ({ params }: Props) => {
  const { locale } = await params;

  const { data: professors, hasError: hasProfessorsError } =
    await fetchSafely<ProfessorItem[]>(
      () => getPublicProfessorsBySection(locale, "THEOLOGY"),
      [],
    );

  return (
    <FacultyPage
      hasProfessorsError={hasProfessorsError}
      namespace="TheologyFacultyPage"
      professors={professors}
    />
  );
};

export default TheologyFacultyPage;
