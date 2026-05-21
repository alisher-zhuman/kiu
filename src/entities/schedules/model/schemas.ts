import { z } from "zod";

import { FACULTY_SECTION_OPTIONS } from "@/shared/constants";

export const ScheduleItemSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  level: z.string(),
  section: z.enum(FACULTY_SECTION_OPTIONS),
  dateOfPublication: z.string(),
});

export const SchedulesResponseSchema = z.array(ScheduleItemSchema);

export const ScheduleActionResponseSchema = z.object({
  message: z.string(),
});
