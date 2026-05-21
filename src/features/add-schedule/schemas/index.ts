import { z } from "zod";

import { SCHEDULE_LEVEL_OPTIONS } from "@/entities/schedules";
import { FACULTY_SECTION_OPTIONS } from "@/shared/constants";

export const createAddScheduleFormSchema = (t: (key: string) => string) =>
  z.object({
    content: z.string().trim().min(1, t("errors.file.required")),
    title: z.string().trim().min(1, t("errors.title.required")),
    level: z.enum(SCHEDULE_LEVEL_OPTIONS, {
      error: () => t("errors.level.required"),
    }),
    section: z.enum(FACULTY_SECTION_OPTIONS, {
      error: () => t("errors.section.required"),
    }),
    dateOfPublication: z.string().trim().min(1, t("errors.date.required")),
  });
