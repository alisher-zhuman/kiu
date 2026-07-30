import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { type AppLocale } from "@/i18n/routing";

import { Applicants } from "@/widgets/applicants";

import { getPageMetadata } from "../../helpers";

interface Props {
  params: Promise<{ locale: AppLocale }>;
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { locale } = await params;

  return getPageMetadata({ locale, pageKey: "applicants", path: "/applicants" });
};

export const ApplicantsPage = async ({ params }: Props) => {
  const { locale } = await params;

  setRequestLocale(locale);

  return <Applicants />;
};

export default ApplicantsPage;
