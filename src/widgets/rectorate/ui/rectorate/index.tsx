import { useTranslations } from "next-intl";

import { type ProfessorItem } from "@/entities/professors";

import { PageTitle } from "@/shared/ui/page-title";
import { PublicProfessorCard } from "@/shared/ui/public-professor-card";
import { Reveal } from "@/shared/ui/reveal";

interface Props {
  hasError?: boolean;
  professors: ProfessorItem[];
}

export const Rectorate = ({ hasError = false, professors }: Props) => {
  const t = useTranslations("RectoratePage");

  return (
    <main className="mx-auto max-w-400 px-5 py-10 text-black md:px-10 md:py-16">
      <section className="space-y-8 md:space-y-10">
        <Reveal>
          <PageTitle>{t("title")}</PageTitle>
        </Reveal>

        {hasError ? (
          <Reveal delay={50}>
            <div className="rounded-3xl border border-red-200 bg-red-50 px-5 py-4 text-base text-red-600 md:px-6 md:py-5 md:text-lg">
              {t("error")}
            </div>
          </Reveal>
        ) : null}

        {!hasError && !professors.length ? (
          <Reveal delay={50}>
            <div className="rounded-3xl border border-black/10 bg-white px-5 py-10 text-center text-base text-black/60 shadow-[0_14px_32px_rgba(0,0,0,0.04)] md:px-6 md:py-12 md:text-lg">
              {t("empty")}
            </div>
          </Reveal>
        ) : null}

        {professors.length ? (
          <div className="grid items-stretch gap-5 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
            {professors.map((item, index) => (
              <Reveal
                key={item.id}
                delay={Math.min(index * 50, 200)}
                className="h-full"
              >
                <PublicProfessorCard item={item} priority={index === 0} />
              </Reveal>
            ))}
          </div>
        ) : null}
      </section>
    </main>
  );
};
