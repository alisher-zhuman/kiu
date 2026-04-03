"use client";

import { useTranslations } from "next-intl";
import { Trash2 } from "lucide-react";

import { AdminActionButton } from "@/shared/ui/admin-action-button";

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
  const t = useTranslations("AdminProfessorsPage.delete");

  const { isPending, onDeleteProfessor } = useDeleteProfessor({ id });

  return (
    <AdminActionButton
      className={className}
      iconOnlyOnMobile={iconOnlyOnMobile}
      idleLabel={t("action")}
      isPending={isPending}
      mobileIcon={<Trash2 className="size-4 md:hidden" />}
      onClick={onDeleteProfessor}
      pendingLabel={t("pending")}
      variant="danger"
    />
  );
};
