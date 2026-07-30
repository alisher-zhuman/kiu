import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";

import { type AppLocale } from "@/i18n/routing";

import { Departments } from "@/widgets/departments";

interface Props {
  params: Promise<{ locale: AppLocale }>;
}

const DepartmentsPage = async ({ params }: Props) => {
  const { locale } = await params;

  setRequestLocale(locale);

  return (
    <Suspense fallback={null}>
      <Departments />
    </Suspense>
  );
};

export default DepartmentsPage;
