import { api } from "@/shared/configs";
import { API_ROUTES } from "@/shared/constants";

import {
  ScheduleActionResponseSchema,
  SchedulesByLevelSchema,
} from "../model/schemas";
import { type CreateSchedulePayload } from "../model/types";

export const createSchedule = async (payload: CreateSchedulePayload) => {
  const { data } = await api.post(API_ROUTES.SCHEDULES, payload);

  return ScheduleActionResponseSchema.parse(data);
};

export const getSchedulesByLevel = async (level: string) => {
  const { data } = await api.get(`${API_ROUTES.SCHEDULES}/all/${level}`);

  return SchedulesByLevelSchema.parse(data);
};
