"use client";

import { useLocale, useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";

import { getProfessors } from "@/entities/professors";

import { QUERY_KEYS } from "@/shared/constants";
import { getApiErrorMessage } from "@/shared/helpers";

import { ProfessorCard } from "../professor-card";

export const AdminProfessors = () => {
  const locale = useLocale();

  const t = useTranslations("AdminProfessorsPage");

  const { data: professors, error, isLoading } = useQuery({
    queryKey: QUERY_KEYS.adminProfessors(locale),
    queryFn: getProfessors,
  });

  return (
    <main className="mx-auto max-w-400 px-5 pt-3 pb-8 text-black md:px-10 md:pt-4 md:pb-10">
      <section aria-label={t("sectionLabel")} className="space-y-8">
        {isLoading ? (
          <p className="text-base text-black/60 md:text-lg">{t("loading")}</p>
        ) : null}

        {!isLoading && error ? (
          <p className="text-base text-red-600 md:text-lg">
            {getApiErrorMessage(error, t("error"))}
          </p>
        ) : null}

        {!isLoading && !error && !professors?.length ? (
          <p className="text-base text-black/60 md:text-lg">{t("empty")}</p>
        ) : null}

        {professors?.length ? (
          <div className="grid items-stretch gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4">
            {professors.map((item, index) => (
              <ProfessorCard key={item.id} item={item} priority={index === 0} />
            ))}
          </div>
        ) : null}
      </section>
    </main>
  );
};
