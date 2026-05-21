import { type z } from "zod";

import { type FACULTY_SECTION_OPTIONS } from "@/shared/constants";

import {
  type ScheduleActionResponseSchema,
  type ScheduleItemSchema,
  type SchedulesResponseSchema,
} from "./schemas";

export type ScheduleItem = z.infer<typeof ScheduleItemSchema>;
export type SchedulesResponse = z.infer<typeof SchedulesResponseSchema>;
export type ScheduleActionResponse = z.infer<typeof ScheduleActionResponseSchema>;

export interface CreateSchedulePayload {
  title: string;
  content: string;
  level: string;
  section: (typeof FACULTY_SECTION_OPTIONS)[number];
  dateOfPublication: string;
}
