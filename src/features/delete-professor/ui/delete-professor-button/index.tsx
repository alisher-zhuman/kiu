"use client";

import { AdminDeleteButton } from "@/shared/ui/admin-delete-button";

import { useDeleteProfessor } from "../../hooks/useDeleteProfessor";

interface Props {
  className?: string;
  id: number;
  iconOnlyOnMobile?: boolean;
}

export const DeleteProfessorButton = ({ className, iconOnlyOnMobile = false, id }: Props) => {
  const { isPending, onDeleteProfessor } = useDeleteProfessor({ id });

  return (
    <AdminDeleteButton
      className={className}
      iconOnlyOnMobile={iconOnlyOnMobile}
      isPending={isPending}
      namespace="AdminProfessorsPage.delete"
      onDelete={onDeleteProfessor}
    />
  );
};
