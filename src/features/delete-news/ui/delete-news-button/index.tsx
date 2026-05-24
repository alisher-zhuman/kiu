"use client";

import { AdminDeleteButton } from "@/shared/ui/admin-delete-button";

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
  const { isPending, onDeleteNews } = useDeleteNews({ id, redirectOnSuccess });

  return (
    <AdminDeleteButton
      className={className}
      iconOnlyOnMobile={iconOnlyOnMobile}
      isPending={isPending}
      namespace="AdminNewsPage.delete"
      onDelete={onDeleteNews}
    />
  );
};
