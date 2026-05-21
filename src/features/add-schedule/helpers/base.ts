import {
  type CreateSchedulePayload,
  SCHEDULE_LEVEL_OPTIONS,
  SCHEDULE_SECTION_OPTIONS,
  type ScheduleItem,
} from "@/entities/schedules";

import { type AddScheduleFormValues } from "../types";

export const createDefaultScheduleFormValues = (): AddScheduleFormValues => ({
  content: "",
  title: "",
  level: "1",
  section: "THEOLOGY",
  dateOfPublication: "",
});

export const mapEditableScheduleToFormValues = (
  schedule: ScheduleItem,
): AddScheduleFormValues => ({
  content: schedule.content,
  title: schedule.title,
  level: (SCHEDULE_LEVEL_OPTIONS.includes(schedule.level as typeof SCHEDULE_LEVEL_OPTIONS[number])
    ? schedule.level
    : SCHEDULE_LEVEL_OPTIONS[0]) as typeof SCHEDULE_LEVEL_OPTIONS[number],
  section: (SCHEDULE_SECTION_OPTIONS.includes(schedule.section as typeof SCHEDULE_SECTION_OPTIONS[number])
    ? schedule.section
    : SCHEDULE_SECTION_OPTIONS[0]) as typeof SCHEDULE_SECTION_OPTIONS[number],
  dateOfPublication: schedule.dateOfPublication,
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
