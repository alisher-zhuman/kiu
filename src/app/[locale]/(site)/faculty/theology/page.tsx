import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { type AppLocale } from "@/i18n/routing";

import { FacultyPage } from "@/widgets/faculty";

import { type ProfessorItem } from "@/entities/professors";
import { getPublicProfessorsBySection } from "@/entities/professors/api/server";

import { fetchSafely } from "@/shared/helpers";

import { getPageMetadata } from "../../../helpers";

export const revalidate = 60;

interface Props {
  params: Promise<{
    locale: AppLocale;
  }>;
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { locale } = await params;

  return getPageMetadata({ locale, pageKey: "facultyTheology", path: "/faculty/theology" });
};

export const TheologyFacultyPage = async ({ params }: Props) => {
  const { locale } = await params;

  setRequestLocale(locale);

  const { data: professors, hasError: hasProfessorsError } = await fetchSafely<ProfessorItem[]>(
    () => getPublicProfessorsBySection(locale, "THEOLOGY"),
    []
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
