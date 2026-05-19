import { type z } from "zod";

import { type SCHEDULE_SECTION_OPTIONS } from "./constants";
import {
  type ScheduleActionResponseSchema,
  type ScheduleItemSchema,
  type SchedulesByLevelSchema,
} from "./schemas";

export type ScheduleItem = z.infer<typeof ScheduleItemSchema>;
export type SchedulesByLevel = z.infer<typeof SchedulesByLevelSchema>;
export type ScheduleActionResponse = z.infer<typeof ScheduleActionResponseSchema>;

export interface CreateSchedulePayload {
  title: string;
  content: string;
  level: string;
  section: (typeof SCHEDULE_SECTION_OPTIONS)[number];
  dateOfPublication: string;
}
