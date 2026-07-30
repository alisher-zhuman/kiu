import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { type AppLocale } from "@/i18n/routing";

import { Science } from "@/widgets/science";

import { getPageMetadata } from "../../helpers";

interface Props {
  params: Promise<{ locale: AppLocale }>;
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { locale } = await params;

  return getPageMetadata({ locale, pageKey: "science", path: "/science" });
};

export const SciencePage = async ({ params }: Props) => {
  const { locale } = await params;

  setRequestLocale(locale);

  return <Science />;
};

export default SciencePage;
