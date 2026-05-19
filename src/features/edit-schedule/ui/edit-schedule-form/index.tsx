"use client";

import { ScheduleForm } from "@/features/add-schedule/ui/schedule-form";

import { AsyncItemState } from "@/shared/ui/async-item-state";

import { useEditScheduleForm } from "../../hooks/useEditScheduleForm";

interface Props {
  id: number;
}

export const EditScheduleForm = ({ id }: Props) => {
  const form = useEditScheduleForm({ id });

  return (
    <AsyncItemState
      emptyLabel={form.tEdit("empty")}
      error={form.scheduleError}
      errorLabel={form.tEdit("error")}
      isLoading={form.isScheduleLoading}
      item={form.schedule}
      loadingLabel={form.tEdit("loading")}
      render={() => <ScheduleForm {...form} submitLabel={form.tEdit("submit")} />}
    />
  );
};
