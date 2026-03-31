"use client";

import { useLocale, useTranslations } from "next-intl";

import { toggleNewsArchive } from "@/entities/news";

import { QUERY_KEYS } from "@/shared/constants";
import { getApiErrorMessage } from "@/shared/helpers";
import { useToastMutation } from "@/shared/hooks";

interface Params {
  archived: boolean;
  id: number;
}

export const useArchiveNews = ({ archived, id }: Params) => {
  const locale = useLocale();

  const t = useTranslations("AdminNewsPage.archive");

  const mutation = useToastMutation({
    mutationFn: () => toggleNewsArchive(id),
    invalidateKeys: [
      QUERY_KEYS.adminNews(locale),
      QUERY_KEYS.adminNewsById(locale, id),
    ],
    pendingMessage: archived ? t("unarchivePending") : t("archivePending"),
    successMessage: archived ? t("unarchiveSuccess") : t("archiveSuccess"),
    errorMessage: (error: unknown) =>
      getApiErrorMessage(error, archived ? t("unarchiveError") : t("archiveError")),
  });

  return {
    isPending: mutation.isPending,
    onToggleArchive: () => mutation.mutate(),
  };
};
