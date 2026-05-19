import { z } from "zod";

import {
  ScheduleActionResponseSchema,
  ScheduleItemSchema,
  SchedulesByLevelSchema,
} from "./schemas";

import { SCHEDULE_SECTION_OPTIONS } from "./constants";

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
