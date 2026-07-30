import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { type AppLocale } from "@/i18n/routing";

import { Courses } from "@/widgets/courses";

import { getPageMetadata } from "../../helpers";

interface Props {
  params: Promise<{ locale: AppLocale }>;
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { locale } = await params;

  return getPageMetadata({ locale, pageKey: "courses", path: "/courses" });
};

export const CoursesPage = async ({ params }: Props) => {
  const { locale } = await params;

  setRequestLocale(locale);

  return <Courses />;
};

export default CoursesPage;
