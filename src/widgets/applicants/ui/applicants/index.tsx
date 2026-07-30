import { useTranslations } from "next-intl";

import { type Section } from "@/shared/types";
import { PageTitle } from "@/shared/ui/page-title";
import { SectionsAccordion } from "@/shared/ui/sections-accordion";

export const Applicants = () => {
  const t = useTranslations("ApplicantsPage");
  const sections = t.raw("sections") as ReadonlyArray<Section>;

  return (
    <main className="mx-auto max-w-400 px-5 py-10 text-black md:px-10 md:py-16">
      <section aria-labelledby="applicants-page-title">
        <PageTitle id="applicants-page-title" className="uppercase">
          {t("title")}
        </PageTitle>

        <SectionsAccordion sections={sections} />
      </section>
    </main>
  );
};
