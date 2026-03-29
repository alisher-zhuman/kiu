"use client";

import { useTranslations } from "next-intl";

import { cn } from "@/shared/helpers";

import { useArchiveNews } from "../../hooks/useArchiveNews";

interface Props {
  archived: boolean;
  className?: string;
  id: number;
}

export const ArchiveNewsButton = ({ archived, className, id }: Props) => {
  const t = useTranslations("AdminNewsPage.archive");

  const { isPending, onToggleArchive } = useArchiveNews({
    archived,
    id,
  });

  return (
    <button
      type="button"
      onClick={onToggleArchive}
      disabled={isPending}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center rounded-full border px-3 py-1.5 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60 md:text-sm",
        archived
          ? "border-[#004C97]/15 bg-[#004C97]/6 text-[#004C97] hover:bg-[#004C97]/10"
          : "border-black/10 bg-black/3 text-black/70 hover:bg-black/5",
        className,
      )}
    >
      {isPending ? t("pending") : archived ? t("unarchive") : t("archive")}
    </button>
  );
};
