"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Trash2 } from "lucide-react";

import { AdminActionButton } from "@/shared/ui/admin-action-button";
import { ConfirmModal } from "@/shared/ui/confirm-modal";

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
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const t = useTranslations("AdminNewsPage.delete");
  const tLayout = useTranslations("Layout");

  const { isPending, onDeleteNews } = useDeleteNews({ id, redirectOnSuccess });

  return (
    <>
      <AdminActionButton
        className={className}
        iconOnlyOnMobile={iconOnlyOnMobile}
        idleLabel={t("action")}
        isPending={isPending}
        mobileIcon={<Trash2 className="size-4 md:hidden" />}
        onClick={() => setIsConfirmOpen(true)}
        pendingLabel={t("pending")}
        variant="danger"
      />

      <ConfirmModal
        cancelLabel={tLayout("cancel")}
        confirmLabel={t("action")}
        isOpen={isConfirmOpen}
        isPending={isPending}
        message={t("confirmMessage")}
        onCancel={() => setIsConfirmOpen(false)}
        onConfirm={() => { onDeleteNews(); setIsConfirmOpen(false); }}
        title={t("confirmTitle")}
      />
    </>
  );
};
