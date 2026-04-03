"use client";

import { useLocale, useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";

import { AdminCollectionState } from "@/widgets/layout/ui/admin-collection-state";
import { AdminPageShell } from "@/widgets/layout/ui/admin-page-shell";

import { getProfessors } from "@/entities/professors";

import { QUERY_KEYS } from "@/shared/constants";

import { ProfessorCard } from "../professor-card";

export const AdminProfessors = () => {
  const locale = useLocale();

  const t = useTranslations("AdminProfessorsPage");

  const { data: professors, error, isLoading } = useQuery({
    queryKey: QUERY_KEYS.adminProfessors(locale),
    queryFn: getProfessors,
  });

  const professorItems = professors ?? [];

  return (
    <AdminPageShell ariaLabel={t("sectionLabel")}>
      <AdminCollectionState
        emptyLabel={t("empty")}
        error={error}
        errorLabel={t("error")}
        isEmpty={!professors?.length}
        isLoading={isLoading}
        loadingLabel={t("loading")}
      >
        <div className="grid items-stretch gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {professorItems.map((item, index) => (
            <ProfessorCard key={item.id} item={item} priority={index === 0} />
          ))}
        </div>
      </AdminCollectionState>
    </AdminPageShell>
  );
};
