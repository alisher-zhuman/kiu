"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Trash2 } from "lucide-react";

import { AdminActionButton } from "@/shared/ui/admin-action-button";
import { ConfirmModal } from "@/shared/ui/confirm-modal";

import { useDeleteDocument } from "../../hooks/useDeleteDocument";

interface Props {
  className?: string;
  docType: string;
  id: number;
}

export const DeleteDocumentButton = ({ className, docType, id }: Props) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const t = useTranslations("AdminDocumentsPage.delete");
  const tLayout = useTranslations("Layout");

  const { isPending, onDeleteDocument } = useDeleteDocument({ docType, id });

  return (
    <>
      <AdminActionButton
        className={className}
        iconOnlyOnMobile
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
        onConfirm={() => { onDeleteDocument(); setIsConfirmOpen(false); }}
        title={t("confirmTitle")}
      />
    </>
  );
};
