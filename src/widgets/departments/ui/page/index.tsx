import { useTranslations } from "next-intl";

import { type Section } from "@/shared/types";
import { SectionsAccordion } from "@/shared/ui/sections-accordion";

type DepartmentPageNamespace =
  | "PhilologyDepartmentPage"
  | "ShariaDepartmentPage"
  | "TheologyDepartmentPage";

interface Props {
  namespace: DepartmentPageNamespace;
}

export const DepartmentPage = ({ namespace }: Props) => {
  const t = useTranslations(namespace);
  const sections = t.raw("sections") as ReadonlyArray<Section>;

  return (
    <main className="mx-auto max-w-400 px-5 py-10 text-black md:px-10 md:py-16">
      <section aria-labelledby="department-page-title">
        <div className="border-l-2 border-black pl-3 md:pl-4">
          <h1
            id="department-page-title"
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
