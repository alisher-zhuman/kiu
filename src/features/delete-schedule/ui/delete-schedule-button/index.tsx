"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Trash2 } from "lucide-react";

import { AdminActionButton } from "@/shared/ui/admin-action-button";
import { ConfirmModal } from "@/shared/ui/confirm-modal";

import { useDeleteSchedule } from "../../hooks/useDeleteSchedule";

interface Props {
  id: number;
}

export const DeleteScheduleButton = ({ id }: Props) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const t = useTranslations("AdminSchedulesPage.delete");
  const tLayout = useTranslations("Layout");

  const { isPending, onDeleteSchedule } = useDeleteSchedule({ id });

  return (
    <>
      <AdminActionButton
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
        onConfirm={() => { onDeleteSchedule(); setIsConfirmOpen(false); }}
        title={t("confirmTitle")}
      />
    </>
  );
};
