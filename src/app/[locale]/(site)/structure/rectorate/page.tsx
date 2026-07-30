import { setRequestLocale } from "next-intl/server";

import { type AppLocale } from "@/i18n/routing";

import { Rectorate } from "@/widgets/rectorate";

import { type ProfessorItem } from "@/entities/professors";
import { getPublicProfessorsBySection } from "@/entities/professors/api/server";

import { fetchSafely } from "@/shared/helpers";

export const revalidate = 60;

interface Props {
  params: Promise<{
    locale: AppLocale;
  }>;
}

const RectoratePage = async ({ params }: Props) => {
  const { locale } = await params;

  setRequestLocale(locale);

  const { data: professors, hasError } = await fetchSafely<ProfessorItem[]>(
    () => getPublicProfessorsBySection(locale, "ADMINISTRATION"),
    []
  );

  return <Rectorate hasError={hasError} professors={professors} />;
};

export default RectoratePage;
