import { setRequestLocale } from "next-intl/server";

import { type AppLocale } from "@/i18n/routing";

import { AboutUs, Departments, Intro, Rector, Statistics } from "@/widgets/landing";

interface Props {
  params: Promise<{ locale: AppLocale }>;
}

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
