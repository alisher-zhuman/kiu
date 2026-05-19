import { type CreateSchedulePayload } from "@/entities/schedules";

import { type AddScheduleFormValues } from "../types";

export const checkIsPdfFile = (file: File) =>
  file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");

export const createDefaultScheduleFormValues = (): AddScheduleFormValues => ({
  content: "",
  title: "",
  level: "1",
  section: "THEOLOGY",
  dateOfPublication: "",
});

export const mapScheduleFormValuesToPayload = (
  values: AddScheduleFormValues,
): CreateSchedulePayload => ({
  content: values.content,
  title: values.title,
  level: values.level,
  section: values.section,
  dateOfPublication: values.dateOfPublication,
});
