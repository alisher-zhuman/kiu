import { setRequestLocale } from "next-intl/server";

import { type AppLocale } from "@/i18n/routing";

import { Applicants } from "@/widgets/applicants";

interface Props {
  params: Promise<{ locale: AppLocale }>;
}

export const ApplicantsPage = async ({ params }: Props) => {
  const { locale } = await params;

  setRequestLocale(locale);

  return <Applicants />;
};

export default ApplicantsPage;
