import { setRequestLocale } from "next-intl/server";

import { type AppLocale } from "@/i18n/routing";

import { History } from "@/widgets/history";

interface Props {
  params: Promise<{ locale: AppLocale }>;
}

export const HistoryPage = async ({ params }: Props) => {
  const { locale } = await params;

  setRequestLocale(locale);

  return <History />;
};

export default HistoryPage;
