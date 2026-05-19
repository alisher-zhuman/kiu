import { useTranslations } from "next-intl";

import { Reveal } from "@/shared/ui/reveal";

import { type TuitionRow } from "../../types";
import { TuitionDesktopTable } from "./tuition-desktop-table";
import { TuitionMobileList } from "./tuition-mobile-list";

export const Tuition = () => {
  const t = useTranslations("TuitionPage");
  const rows = t.raw("rows") as ReadonlyArray<TuitionRow>;

  return (
    <main className="mx-auto max-w-400 px-5 py-10 text-black md:px-10 md:py-16">
      <section className="space-y-8 md:space-y-10">
        <Reveal>
          <div className="border-l-2 border-black pl-3 md:pl-4">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-5xl">
              {t("title")}
            </h1>
          </div>
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
