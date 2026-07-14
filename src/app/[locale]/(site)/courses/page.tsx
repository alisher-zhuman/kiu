import { setRequestLocale } from "next-intl/server";

import { type AppLocale } from "@/i18n/routing";

import { Courses } from "@/widgets/courses";

interface Props {
  params: Promise<{ locale: AppLocale }>;
}

export const CoursesPage = async ({ params }: Props) => {
  const { locale } = await params;

  setRequestLocale(locale);

  return <Courses />;
};

export default CoursesPage;
