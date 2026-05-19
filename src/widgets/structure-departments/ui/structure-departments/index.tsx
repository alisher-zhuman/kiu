import { useTranslations } from "next-intl";

import { type Section } from "@/shared/types";
import { SectionsAccordion } from "@/shared/ui/sections-accordion";

export const StructureDepartments = () => {
  const t = useTranslations("StructureDepartmentsPage");
  const sections = t.raw("sections") as ReadonlyArray<Section>;

  return (
    <main className="mx-auto max-w-400 px-5 py-10 text-black md:px-10 md:py-16">
      <section aria-labelledby="structure-departments-title" className="space-y-10">
        <div className="border-l-2 border-black pl-3 md:pl-4">
          <h1
            id="structure-departments-title"
            className="text-2xl font-bold tracking-tight sm:text-3xl md:text-5xl"
          >
            {t("title")}
          </h1>
        </div>

        <SectionsAccordion sections={sections} />
      </section>
    </main>
  );
};
