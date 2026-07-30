import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { type AppLocale } from "@/i18n/routing";

import { History } from "@/widgets/history";

import { getPageMetadata } from "../../helpers";

interface Props {
  params: Promise<{ locale: AppLocale }>;
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { locale } = await params;

  return getPageMetadata({ locale, pageKey: "history", path: "/history" });
};

export const HistoryPage = async ({ params }: Props) => {
  const { locale } = await params;

  setRequestLocale(locale);

  return <History />;
};

export default HistoryPage;
