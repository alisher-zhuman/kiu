"use client";

import { useLocale, useTranslations } from "next-intl";

import { deleteDocument } from "@/entities/documents";

import { QUERY_KEYS } from "@/shared/constants";
import { getApiErrorMessage } from "@/shared/helpers";
import { useToastMutation } from "@/shared/hooks";

interface Params {
  id: number;
}

export const useDeleteDocument = ({ id }: Params) => {
  const locale = useLocale();

  const t = useTranslations("AdminDocumentsPage.delete");

  const mutation = useToastMutation({
    mutationFn: () => deleteDocument(id),
    invalidateKeys: [QUERY_KEYS.adminDocuments(locale)],
    pendingMessage: t("pending"),
    successMessage: t("success"),
    errorMessage: (error: unknown) => getApiErrorMessage(error, t("error")),
  });

  return {
    isPending: mutation.isPending,
    onDeleteDocument: () => mutation.mutate(),
  };
};
