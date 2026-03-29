"use client";

import { useTranslations } from "next-intl";

import { cn } from "@/shared/helpers";

import { useDeleteNews } from "../../hooks/useDeleteNews";

interface Props {
  className?: string;
  id: number;
  redirectOnSuccess?: string;
}

export const DeleteNewsButton = ({
  className,
  id,
  redirectOnSuccess,
}: Props) => {
  const t = useTranslations("AdminNewsPage.delete");

  const { isPending, onDeleteNews } = useDeleteNews({
    id,
    redirectOnSuccess,
  });

  return (
    <button
      type="button"
      onClick={onDeleteNews}
      disabled={isPending}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center rounded-full border border-red-500/15 bg-red-500/6 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-60 md:text-sm",
        className,
      )}
    >
      {isPending ? t("pending") : t("action")}
    </button>
  );
};
