import { useTranslations } from "next-intl";

import { type ProfessorItem } from "@/entities/professors";

import { type Section } from "@/shared/types";
import { PublicProfessorCard } from "@/shared/ui/public-professor-card";
import { SectionsAccordion } from "@/shared/ui/sections-accordion";

type DepartmentPageNamespace =
  | "PhilologyDepartmentPage"
  | "ShariaDepartmentPage"
  | "TheologyDepartmentPage";

interface Props {
  hasProfessorsError?: boolean;
  namespace: DepartmentPageNamespace;
  professors?: ProfessorItem[];
}

export const DepartmentPage = ({
  hasProfessorsError = false,
  namespace,
  professors = [],
}: Props) => {
  const t = useTranslations(namespace);
  const sections = t.raw("sections") as ReadonlyArray<Section>;

  return (
    <main className="mx-auto max-w-400 px-5 py-10 text-black md:px-10 md:py-16">
      <section aria-labelledby="department-page-title" className="space-y-10">
        <div className="border-l-2 border-black pl-3 md:pl-4">
          <h1
            id="department-page-title"
            className="text-2xl font-bold tracking-tight sm:text-3xl md:text-5xl"
          >
            {t("title")}
          </h1>
        </div>

        <SectionsAccordion sections={sections} />

        {hasProfessorsError ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 px-5 py-4 text-base text-red-600 md:px-6 md:py-5 md:text-lg">
            {t("professorsError")}
          </div>
        ) : null}

        {!hasProfessorsError && professors.length ? (
          <section className="space-y-6 md:space-y-7">
            <div className="border-l-2 border-black pl-3 md:pl-4">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-5xl">
                {t("professorsTitle")}
              </h2>
            </div>

            <div className="grid items-stretch gap-5 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
              {professors.map((item) => (
                <PublicProfessorCard
                  key={item.id}
                  item={item}
                />
              ))}
            </div>
          </section>
        ) : null}
      </section>
    </main>
  );
};
