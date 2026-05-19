"use client";

import { useTranslations } from "next-intl";

import { deleteSchedule } from "@/entities/schedules";

import { getApiErrorMessage } from "@/shared/helpers";
import { useToastMutation } from "@/shared/hooks";

interface Params {
  id: number;
}

export const useDeleteSchedule = ({ id }: Params) => {
  const t = useTranslations("AdminSchedulesPage.delete");

  const mutation = useToastMutation({
    mutationFn: () => deleteSchedule(id),
    invalidateKeys: [["admin-schedules"]],
    pendingMessage: t("pending"),
    successMessage: t("success"),
    errorMessage: (error: unknown) => getApiErrorMessage(error, t("error")),
  });

  return {
    isPending: mutation.isPending,
    onDeleteSchedule: () => mutation.mutate(),
  };
};
