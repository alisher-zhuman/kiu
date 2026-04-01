import { type AppLocale } from "@/i18n/routing";

import { Rectorate } from "@/widgets/rectorate";

import { type ProfessorItem } from "@/entities/professors";
import { getPublicProfessors } from "@/entities/professors/api/server";

interface Props {
  params: Promise<{
    locale: AppLocale;
  }>;
}

const RectoratePage = async ({ params }: Props) => {
  const { locale } = await params;
  
  let hasError = false;
  let professors: ProfessorItem[] = [];

  try {
    const allProfessors = await getPublicProfessors(locale);

    professors = allProfessors.filter((item) =>
      item.sections.includes("ADMINISTRATION"),
    );
  } catch {
    hasError = true;
  }

  return <Rectorate hasError={hasError} professors={professors} />;
};

export default RectoratePage;
