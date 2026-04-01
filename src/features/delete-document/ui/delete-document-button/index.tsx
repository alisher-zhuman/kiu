"use client";

import { useTranslations } from "next-intl";
import { Loader2, Trash2 } from "lucide-react";

import { cn } from "@/shared/helpers";

import { useDeleteDocument } from "../../hooks/useDeleteDocument";

interface Props {
  className?: string;
  id: number;
}

export const DeleteDocumentButton = ({ className, id }: Props) => {
  const t = useTranslations("AdminDocumentsPage.delete");

  const { isPending, onDeleteDocument } = useDeleteDocument({ id });

  return (
    <button
      type="button"
      onClick={onDeleteDocument}
      disabled={isPending}
      aria-label={isPending ? t("pending") : t("action")}
      className={cn(
        "inline-flex size-9 cursor-pointer items-center justify-center rounded-full border border-red-500/15 bg-red-500/6 text-red-600 transition-colors hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-60 md:size-auto md:px-4 md:py-2 md:text-sm md:font-semibold",
        className,
      )}
    >
      {isPending ? (
        <Loader2 className="size-4 animate-spin md:hidden" />
      ) : (
        <Trash2 className="size-4 md:hidden" />
      )}
      <span className="hidden md:inline">{isPending ? t("pending") : t("action")}</span>
    </button>
  );
};
