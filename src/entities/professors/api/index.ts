import { api } from "@/shared/configs";
import { API_ROUTES } from "@/shared/constants";

import {
  ProfessorActionResponseSchema,
  ProfessorsResponseSchema,
} from "../model/schemas";
import { type CreateProfessorPayload } from "../model/types";

export const createProfessor = async (payload: CreateProfessorPayload) => {
  const { data } = await api.post(API_ROUTES.PROFESSORS, payload);

  return ProfessorActionResponseSchema.parse(data);
};

export const deleteProfessor = async (id: number) => {
  const { data } = await api.delete(`${API_ROUTES.PROFESSORS}/${id}`);

  return ProfessorActionResponseSchema.parse(data);
};

export const getProfessors = async () => {
  const { data } = await api.get(API_ROUTES.PROFESSORS);

  return ProfessorsResponseSchema.parse(data);
};
