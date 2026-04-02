"use client";

import { useTranslations } from "next-intl";
import { Loader2, Trash2 } from "lucide-react";

import { cn } from "@/shared/helpers";

import { useDeleteNews } from "../../hooks/useDeleteNews";

interface Props {
  className?: string;
  id: number;
  iconOnlyOnMobile?: boolean;
  redirectOnSuccess?: string;
}

export const DeleteNewsButton = ({
  className,
  id,
  iconOnlyOnMobile = false,
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
      aria-label={isPending ? t("pending") : t("action")}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center rounded-full border border-red-500/15 bg-red-500/6 text-red-600 transition-colors hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-60",
        iconOnlyOnMobile
          ? "size-9 md:size-auto md:px-4 md:py-2 md:text-sm md:font-semibold"
          : "px-3 py-1.5 text-xs font-medium md:text-sm",
        className,
      )}
    >
      {iconOnlyOnMobile ? (
        <>
          {isPending ? (
            <Loader2 className="size-4 animate-spin md:hidden" />
          ) : (
            <Trash2 className="size-4 md:hidden" />
          )}
          <span className="hidden md:inline">
            {isPending ? t("pending") : t("action")}
          </span>
        </>
      ) : isPending ? (
        t("pending")
      ) : (
        t("action")
      )}
    </button>
  );
};
