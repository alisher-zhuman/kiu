"use client";

import { useTranslations } from "next-intl";
import { Trash2 } from "lucide-react";

import { AdminActionButton } from "@/shared/ui/admin-action-button";

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
    <AdminActionButton
      className={className}
      iconOnlyOnMobile={iconOnlyOnMobile}
      idleLabel={t("action")}
      isPending={isPending}
      mobileIcon={<Trash2 className="size-4 md:hidden" />}
      onClick={onDeleteNews}
      pendingLabel={t("pending")}
      variant="danger"
    />
  );
};
