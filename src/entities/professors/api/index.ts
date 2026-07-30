import { api } from "@/shared/configs";
import { API_ROUTES } from "@/shared/constants";

import {
  ProfessorActionResponseSchema,
  ProfessorDetailSchema,
  ProfessorsResponseSchema,
} from "../model/schemas";
import { type CreateProfessorPayload, type ProfessorDetail } from "../model/types";

export const createProfessor = async (payload: CreateProfessorPayload) => {
  const { data } = await api.post(API_ROUTES.PROFESSORS, payload);

  return ProfessorActionResponseSchema.parse(data);
};

export const getProfessors = async () => {
  const { data } = await api.get(API_ROUTES.PROFESSORS);

  return ProfessorsResponseSchema.parse(data);
};

export const getProfessorById = async (id: number): Promise<ProfessorDetail> => {
  const { data } = await api.get(`${API_ROUTES.PROFESSORS}/${id}`);

  return ProfessorDetailSchema.parse(data);
};

export const getProfessorByIdForEdit = async (id: number): Promise<ProfessorDetail> => {
  const { data } = await api.get(`${API_ROUTES.PROFESSORS}/${id}/edit`);

  return ProfessorDetailSchema.parse(data);
};

export const deleteProfessor = async (id: number) => {
  const { data } = await api.delete(`${API_ROUTES.PROFESSORS}/${id}`);

  return ProfessorActionResponseSchema.parse(data);
};

export const updateProfessor = async (id: number, payload: CreateProfessorPayload) => {
  const { data } = await api.put(`${API_ROUTES.PROFESSORS}/${id}`, payload);

  return ProfessorActionResponseSchema.parse(data);
};
