"use client";

import { useTranslations } from "next-intl";
import { Archive, ArchiveRestore, Loader2 } from "lucide-react";

import { cn } from "@/shared/helpers";

import { useArchiveNews } from "../../hooks/useArchiveNews";

interface Props {
  archived: boolean;
  className?: string;
  id: number;
  iconOnlyOnMobile?: boolean;
}

export const ArchiveNewsButton = ({
  archived,
  className,
  iconOnlyOnMobile = false,
  id,
}: Props) => {
  const t = useTranslations("AdminNewsPage.archive");

  const { isPending, onToggleArchive } = useArchiveNews({
    archived,
    id,
  });

  const idleLabel = archived ? t("unarchive") : t("archive");
  const pendingLabel = archived ? t("unarchivePending") : t("archivePending");

  return (
    <button
      type="button"
      onClick={onToggleArchive}
      disabled={isPending}
      aria-label={isPending ? pendingLabel : idleLabel}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-60",
        iconOnlyOnMobile
          ? "size-9 md:size-auto md:px-4 md:py-2 md:text-sm md:font-semibold"
          : "px-3 py-1.5 text-xs font-medium md:text-sm",
        archived
          ? "border-[#004C97]/15 bg-[#004C97]/6 text-[#004C97] hover:bg-[#004C97]/10"
          : "border-black/10 bg-black/3 text-black/70 hover:bg-black/5",
        className,
      )}
    >
      {iconOnlyOnMobile ? (
        <>
          {isPending ? (
            <Loader2 className="size-4 animate-spin md:hidden" />
          ) : archived ? (
            <ArchiveRestore className="size-4 md:hidden" />
          ) : (
            <Archive className="size-4 md:hidden" />
          )}
          <span className="hidden md:inline">
            {isPending ? pendingLabel : idleLabel}
          </span>
        </>
      ) : isPending ? (
        pendingLabel
      ) : (
        idleLabel
      )}
    </button>
  );
};
