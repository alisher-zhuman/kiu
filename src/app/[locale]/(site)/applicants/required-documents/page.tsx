import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { type AppLocale } from "@/i18n/routing";

import { RequiredDocuments } from "@/widgets/applicants";

import { getPageMetadata } from "../../../helpers";

interface Props {
  params: Promise<{ locale: AppLocale }>;
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { locale } = await params;

  return getPageMetadata({
    locale,
    pageKey: "applicantsRequiredDocuments",
    path: "/applicants/required-documents",
  });
};

export const RequiredDocumentsPage = async ({ params }: Props) => {
  const { locale } = await params;

  setRequestLocale(locale);

  return <RequiredDocuments />;
};

export default RequiredDocumentsPage;
