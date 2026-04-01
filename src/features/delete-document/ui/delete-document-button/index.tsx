"use client";

import { useTranslations } from "next-intl";

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
      className={cn(
        "inline-flex cursor-pointer items-center justify-center rounded-full border border-red-500/15 bg-red-500/6 px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
    >
      {isPending ? t("pending") : t("action")}
    </button>
  );
};
