import { setRequestLocale } from "next-intl/server";

import { type AppLocale } from "@/i18n/routing";

import { Science } from "@/widgets/science";

interface Props {
  params: Promise<{ locale: AppLocale }>;
}

export const SciencePage = async ({ params }: Props) => {
  const { locale } = await params;

  setRequestLocale(locale);

  return <Science />;
};

export default SciencePage;
