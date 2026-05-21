import { useTranslations } from "next-intl";

import { PageTitle } from "@/shared/ui/page-title";
import { Reveal } from "@/shared/ui/reveal";

import { type TuitionRow } from "../../types";
import { TuitionDesktopTable } from "../tuition-desktop-table";
import { TuitionMobileList } from "../tuition-mobile-list";

export const Tuition = () => {
  const t = useTranslations("TuitionPage");
  const rows = t.raw("rows") as ReadonlyArray<TuitionRow>;

  return (
    <main className="mx-auto max-w-400 px-5 py-10 text-black md:px-10 md:py-16">
      <section className="space-y-8 md:space-y-10">
        <Reveal>
          <PageTitle>{t("title")}</PageTitle>
        </Reveal>

        <Reveal delay={50} className="md:hidden">
          <TuitionMobileList rows={rows} t={t} />
        </Reveal>

        <Reveal delay={50} className="hidden md:block">
          <TuitionDesktopTable rows={rows} t={t} />
        </Reveal>
      </section>
    </main>
  );
};
