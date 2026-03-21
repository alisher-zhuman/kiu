import { useTranslations } from "next-intl";

import { type Section } from "@/shared/types";
import { SectionsAccordion } from "@/shared/ui/sections-accordion";

export const Applicants = () => {
  const t = useTranslations("ApplicantsPage");
  const sections = t.raw("sections") as ReadonlyArray<Section>;

  return (
    <main className="mx-auto max-w-400 px-5 py-10 text-black md:px-10 md:py-16">
      <section aria-labelledby="applicants-page-title">
        <div className="border-l-2 border-black pl-3 md:pl-4">
          <h1
            id="applicants-page-title"
            className="text-2xl font-bold uppercase sm:text-3xl md:text-5xl"
          >
            {t("title")}
          </h1>
        </div>

        <SectionsAccordion sections={sections} />
      </section>
    </main>
  );
};
