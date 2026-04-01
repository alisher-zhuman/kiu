"use client";

import { useTranslations } from "next-intl";

import { cn } from "@/shared/helpers";

import { useDeleteProfessor } from "../../hooks/useDeleteProfessor";

interface Props {
  className?: string;
  id: number;
}

export const DeleteProfessorButton = ({ className, id }: Props) => {
  const t = useTranslations("AdminProfessorsPage.delete");

  const { isPending, onDeleteProfessor } = useDeleteProfessor({ id });

  return (
    <button
      type="button"
      onClick={onDeleteProfessor}
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
