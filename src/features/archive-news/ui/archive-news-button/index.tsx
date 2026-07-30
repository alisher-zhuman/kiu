"use client";

import { useTranslations } from "next-intl";
import { Archive, ArchiveRestore } from "lucide-react";

import { AdminActionButton } from "@/shared/ui/admin-action-button";

import { useArchiveNews } from "../../hooks/useArchiveNews";

interface Props {
  archived: boolean;
  className?: string;
  id: number;
  iconOnlyOnMobile?: boolean;
}

export const ArchiveNewsButton = ({ archived, className, iconOnlyOnMobile = false, id }: Props) => {
  const t = useTranslations("AdminNewsPage.archive");

  const { isPending, onToggleArchive } = useArchiveNews({
    archived,
    id,
  });

  const idleLabel = archived ? t("unarchive") : t("archive");
  const pendingLabel = archived ? t("unarchivePending") : t("archivePending");

  return (
    <AdminActionButton
      className={className}
      iconOnlyOnMobile={iconOnlyOnMobile}
      idleLabel={idleLabel}
      isPending={isPending}
      mobileIcon={
        archived ? (
          <ArchiveRestore className="size-4 md:hidden" />
        ) : (
          <Archive className="size-4 md:hidden" />
        )
      }
      onClick={onToggleArchive}
      pendingLabel={pendingLabel}
      variant={archived ? "primary" : "neutral"}
    />
  );
};
