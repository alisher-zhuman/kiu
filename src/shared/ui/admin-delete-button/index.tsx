"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Trash2 } from "lucide-react";

import { AdminActionButton } from "@/shared/ui/admin-action-button";
import { ConfirmModal } from "@/shared/ui/confirm-modal";

interface Props {
  className?: string | undefined;
  iconOnly?: boolean | undefined;
  iconOnlyOnMobile?: boolean | undefined;
  isPending: boolean;
  namespace: string;
  onDelete: () => void;
}

export const AdminDeleteButton = ({
  className,
  iconOnly = false,
  iconOnlyOnMobile = false,
  isPending,
  namespace,
  onDelete,
}: Props) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const t = useTranslations(namespace);
  const tLayout = useTranslations("Layout");

  return (
    <>
      <AdminActionButton
        className={className}
        iconOnly={iconOnly}
        iconOnlyOnMobile={iconOnlyOnMobile}
        idleLabel={t("action")}
        isPending={isPending}
        mobileIcon={<Trash2 className="size-4" />}
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
        onConfirm={() => { onDelete(); setIsConfirmOpen(false); }}
        title={t("confirmTitle")}
      />
    </>
  );
};
