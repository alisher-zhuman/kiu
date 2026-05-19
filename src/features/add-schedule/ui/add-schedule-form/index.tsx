"use client";

import { useAddScheduleForm } from "../../hooks/useAddScheduleForm";
import { ScheduleForm } from "../schedule-form";

export const AddScheduleForm = () => {
  const form = useAddScheduleForm();

  return <ScheduleForm {...form} submitLabel={form.t("submit")} />;
};
