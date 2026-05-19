"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Trash2 } from "lucide-react";

import { AdminActionButton } from "@/shared/ui/admin-action-button";
import { ConfirmModal } from "@/shared/ui/confirm-modal";

import { useDeleteProfessor } from "../../hooks/useDeleteProfessor";

interface Props {
  className?: string;
  id: number;
  iconOnlyOnMobile?: boolean;
}

export const DeleteProfessorButton = ({
  className,
  iconOnlyOnMobile = false,
  id,
}: Props) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const t = useTranslations("AdminProfessorsPage.delete");
  const tLayout = useTranslations("Layout");

  const { isPending, onDeleteProfessor } = useDeleteProfessor({ id });

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
        onConfirm={() => { onDeleteProfessor(); setIsConfirmOpen(false); }}
        title={t("confirmTitle")}
      />
    </>
  );
};
