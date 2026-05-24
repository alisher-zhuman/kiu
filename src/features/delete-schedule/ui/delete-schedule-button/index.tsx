"use client";

import { AdminDeleteButton } from "@/shared/ui/admin-delete-button";

import { useDeleteSchedule } from "../../hooks/useDeleteSchedule";

interface Props {
  id: number;
}

export const DeleteScheduleButton = ({ id }: Props) => {
  const { isPending, onDeleteSchedule } = useDeleteSchedule({ id });

  return (
    <AdminDeleteButton
      iconOnly
      isPending={isPending}
      namespace="AdminSchedulesPage.delete"
      onDelete={onDeleteSchedule}
    />
  );
};
