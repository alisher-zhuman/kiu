import { useTranslations } from "next-intl";

import { type Section } from "@/shared/types";
import { PageTitle } from "@/shared/ui/page-title";
import { SectionsAccordion } from "@/shared/ui/sections-accordion";

export const Science = () => {
  const t = useTranslations("SciencePage");
  const sections = t.raw("sections") as ReadonlyArray<Section>;

  return (
    <main className="mx-auto max-w-400 px-5 py-10 text-black md:px-10 md:py-16">
      <section aria-labelledby="science-page-title">
        <PageTitle id="science-page-title" className="uppercase">{t("title")}</PageTitle>

        <SectionsAccordion sections={sections} />
      </section>
    </main>
  );
};
