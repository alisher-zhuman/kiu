import { setRequestLocale } from "next-intl/server";

import { type AppLocale } from "@/i18n/routing";

import { RequiredDocuments } from "@/widgets/applicants";

interface Props {
  params: Promise<{ locale: AppLocale }>;
}

export const RequiredDocumentsPage = async ({ params }: Props) => {
  const { locale } = await params;

  setRequestLocale(locale);

  return <RequiredDocuments />;
};

export default RequiredDocumentsPage;
