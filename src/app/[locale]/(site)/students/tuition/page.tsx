import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { type AppLocale } from "@/i18n/routing";

import { StudentsTuition } from "@/widgets/students";

import { getPageMetadata } from "../../../helpers";

interface Props {
  params: Promise<{ locale: AppLocale }>;
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { locale } = await params;

  return getPageMetadata({ locale, pageKey: "studentsTuition", path: "/students/tuition" });
};

const StudentsTuitionPage = async ({ params }: Props) => {
  const { locale } = await params;

  setRequestLocale(locale);

  return <StudentsTuition />;
};

export default StudentsTuitionPage;
