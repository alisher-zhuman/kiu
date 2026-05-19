import { api } from "@/shared/configs";
import { API_ROUTES } from "@/shared/constants";

import {
  ScheduleActionResponseSchema,
  ScheduleItemSchema,
  SchedulesResponseSchema,
} from "../model/schemas";
import { type CreateSchedulePayload } from "../model/types";

export const createSchedule = async (payload: CreateSchedulePayload) => {
  const { data } = await api.post(API_ROUTES.SCHEDULES, payload);

  return ScheduleActionResponseSchema.parse(data);
};

export const getScheduleById = async (id: number) => {
  const { data } = await api.get(`${API_ROUTES.SCHEDULES}/${id}`);

  return ScheduleItemSchema.parse(data);
};

export const updateSchedule = async (id: number, payload: CreateSchedulePayload) => {
  const { data } = await api.put(`${API_ROUTES.SCHEDULES}/${id}`, payload);

  return ScheduleActionResponseSchema.parse(data);
};

export const deleteSchedule = async (id: number) => {
  const { data } = await api.delete(`${API_ROUTES.SCHEDULES}/${id}`);

  return ScheduleActionResponseSchema.parse(data);
};

export const getSchedulesByLevel = async (level: string, section: string) => {
  const { data } = await api.get(`${API_ROUTES.SCHEDULES}/all/${level}`, {
    params: { section },
  });

  return SchedulesResponseSchema.parse(data);
};
