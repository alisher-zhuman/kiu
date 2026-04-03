"use client";

import { useLocale, useTranslations } from "next-intl";

import { deleteProfessor } from "@/entities/professors";

import { QUERY_KEYS } from "@/shared/constants";
import { getApiErrorMessage } from "@/shared/helpers";
import { useDeleteEntityAction } from "@/shared/hooks";

interface Params {
  id: number;
}

export const useDeleteProfessor = ({ id }: Params) => {
  const locale = useLocale();

  const t = useTranslations("AdminProfessorsPage.delete");

  const action = useDeleteEntityAction({
    mutationFn: () => deleteProfessor(id),
    invalidateKeys: [QUERY_KEYS.adminProfessors(locale)],
    pendingMessage: t("pending"),
    successMessage: t("success"),
    errorMessage: (error: unknown) =>
      getApiErrorMessage(error, t("error")),
  });

  return {
    isPending: action.isPending,
    onDeleteProfessor: action.onDelete,
  };
};
