import { Suspense } from "react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { type AppLocale } from "@/i18n/routing";

import { Departments } from "@/widgets/departments";

import { getPageMetadata } from "../../../helpers";

interface Props {
  params: Promise<{ locale: AppLocale }>;
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { locale } = await params;

  return getPageMetadata({ locale, pageKey: "departments", path: "/structure/departments" });
};

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
