import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { type AppLocale } from "@/i18n/routing";

import { AboutUs, Departments, Intro, Rector, Statistics } from "@/widgets/landing";

import { getPageMetadata } from "../helpers";

interface Props {
  params: Promise<{ locale: AppLocale }>;
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { locale } = await params;

  return getPageMetadata({ locale, pageKey: "home" });
};

const Home = async ({ params }: Props) => {
  const { locale } = await params;

  setRequestLocale(locale);

  return (
    <main>
      <Intro />
      <AboutUs />
      <Departments />
      <Statistics />
      <Rector />
    </main>
  );
};

export default Home;
