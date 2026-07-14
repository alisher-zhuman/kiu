import { setRequestLocale } from "next-intl/server";

import { type AppLocale } from "@/i18n/routing";

import { Departments } from "@/widgets/departments";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ locale: AppLocale }>;
}

const DepartmentsPage = async ({ params }: Props) => {
  const { locale } = await params;

  setRequestLocale(locale);

  return <Departments />;
};

export default DepartmentsPage;
