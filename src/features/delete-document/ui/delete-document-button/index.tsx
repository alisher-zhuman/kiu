"use client";

import { useTranslations } from "next-intl";
import { Trash2 } from "lucide-react";

import { AdminActionButton } from "@/shared/ui/admin-action-button";

import { useDeleteDocument } from "../../hooks/useDeleteDocument";

interface Props {
  className?: string;
  id: number;
}

export const DeleteDocumentButton = ({ className, id }: Props) => {
  const t = useTranslations("AdminDocumentsPage.delete");

  const { isPending, onDeleteDocument } = useDeleteDocument({ id });

  return (
    <AdminActionButton
      className={className}
      iconOnlyOnMobile
      idleLabel={t("action")}
      isPending={isPending}
      mobileIcon={<Trash2 className="size-4 md:hidden" />}
      onClick={onDeleteDocument}
      pendingLabel={t("pending")}
      variant="danger"
    />
  );
};
