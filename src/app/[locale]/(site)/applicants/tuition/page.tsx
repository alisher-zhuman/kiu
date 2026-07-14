import { setRequestLocale } from "next-intl/server";

import { type AppLocale } from "@/i18n/routing";

import { Tuition } from "@/widgets/applicants";

interface Props {
  params: Promise<{ locale: AppLocale }>;
}

const ApplicantsTuitionPage = async ({ params }: Props) => {
  const { locale } = await params;

  setRequestLocale(locale);

  return <Tuition />;
};

export default ApplicantsTuitionPage;
