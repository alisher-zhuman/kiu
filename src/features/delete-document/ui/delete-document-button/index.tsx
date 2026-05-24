"use client";

import { AdminDeleteButton } from "@/shared/ui/admin-delete-button";

import { useDeleteDocument } from "../../hooks/useDeleteDocument";

interface Props {
  className?: string | undefined;
  docType: string;
  id: number;
}

export const DeleteDocumentButton = ({ className, docType, id }: Props) => {
  const { isPending, onDeleteDocument } = useDeleteDocument({ docType, id });

  return (
    <AdminDeleteButton
      className={className}
      iconOnlyOnMobile
      isPending={isPending}
      namespace="AdminDocumentsPage.delete"
      onDelete={onDeleteDocument}
    />
  );
};
