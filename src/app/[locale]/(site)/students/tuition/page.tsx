import { setRequestLocale } from "next-intl/server";

import { type AppLocale } from "@/i18n/routing";

import { StudentsTuition } from "@/widgets/students";

interface Props {
  params: Promise<{ locale: AppLocale }>;
}

const StudentsTuitionPage = async ({ params }: Props) => {
  const { locale } = await params;

  setRequestLocale(locale);

  return <StudentsTuition />;
};

export default StudentsTuitionPage;
