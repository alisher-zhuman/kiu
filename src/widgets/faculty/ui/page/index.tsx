import { useTranslations } from "next-intl";

import { type ProfessorItem } from "@/entities/professors";

import { type Section } from "@/shared/types";
import { PageTitle } from "@/shared/ui/page-title";
import { PublicProfessorCard } from "@/shared/ui/public-professor-card";
import { SectionsAccordion } from "@/shared/ui/sections-accordion";

type FacultyPageNamespace =
  | "PhilologyFacultyPage"
  | "ShariaFacultyPage"
  | "TheologyFacultyPage";

interface Props {
  hasProfessorsError?: boolean;
  namespace: FacultyPageNamespace;
  professors?: ProfessorItem[];
}

export const FacultyPage = ({
  hasProfessorsError = false,
  namespace,
  professors = [],
}: Props) => {
  const t = useTranslations(namespace);
  const sections = t.raw("sections") as ReadonlyArray<Section>;

  return (
    <main className="mx-auto max-w-400 px-5 py-10 text-black md:px-10 md:py-16">
      <section aria-labelledby="faculty-page-title" className="space-y-10">
        <PageTitle id="faculty-page-title">{t("title")}</PageTitle>

        <SectionsAccordion sections={sections} />

        {hasProfessorsError ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 px-5 py-4 text-base text-red-600 md:px-6 md:py-5 md:text-lg">
            {t("professorsError")}
          </div>
        ) : null}

        {!hasProfessorsError && !professors.length ? (
          <div className="rounded-3xl border border-black/10 bg-white px-5 py-10 text-center text-base text-black/60 shadow-[0_14px_32px_rgba(0,0,0,0.04)] md:px-6 md:py-12 md:text-lg">
            {t("professorsEmpty")}
          </div>
        ) : null}

        {!hasProfessorsError && professors.length ? (
          <section className="space-y-6 md:space-y-7">
            <PageTitle as="h2">{t("professorsTitle")}</PageTitle>

            <div className="grid items-stretch gap-5 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
              {professors.map((item, index) => (
                <PublicProfessorCard
                  key={item.id}
                  item={item}
                  priority={index === 0}
                />
              ))}
            </div>
          </section>
        ) : null}
      </section>
    </main>
  );
};
