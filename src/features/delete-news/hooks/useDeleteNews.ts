"use client";

import { useLocale, useTranslations } from "next-intl";

import { useRouter } from "@/i18n/navigation";

import { deleteNews } from "@/entities/news";

import { QUERY_KEYS } from "@/shared/constants";
import { getApiErrorMessage } from "@/shared/helpers";
import { useDeleteEntityAction } from "@/shared/hooks";

interface Params {
  id: number;
  redirectOnSuccess?: string | undefined;
}

export const useDeleteNews = ({ id, redirectOnSuccess }: Params) => {
  const locale = useLocale();
  
  const router = useRouter();

  const t = useTranslations("AdminNewsPage.delete");

  const action = useDeleteEntityAction({
    mutationFn: () => deleteNews(id),
    invalidateKeys: [
      QUERY_KEYS.adminNews(locale),
      QUERY_KEYS.adminNewsById(locale, id),
    ],
    pendingMessage: t("pending"),
    successMessage: t("success"),
    errorMessage: (error: unknown) =>
      getApiErrorMessage(error, t("error")),
    onSuccess: () => {
      if (!redirectOnSuccess) {
        return;
      }

      router.replace(redirectOnSuccess);
    },
  });

  return {
    isPending: action.isPending,
    onDeleteNews: action.onDelete,
  };
};
