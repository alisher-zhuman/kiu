import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { type AppLocale } from "@/i18n/routing";

import { Tuition } from "@/widgets/applicants";

import { getPageMetadata } from "../../../helpers";

interface Props {
  params: Promise<{ locale: AppLocale }>;
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { locale } = await params;

  return getPageMetadata({ locale, pageKey: "applicantsTuition", path: "/applicants/tuition" });
};

const ApplicantsTuitionPage = async ({ params }: Props) => {
  const { locale } = await params;

  setRequestLocale(locale);

  return <Tuition />;
};

export default ApplicantsTuitionPage;
