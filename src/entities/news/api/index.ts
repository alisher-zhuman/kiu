import { api } from "@/shared/configs";
import { API_ROUTES } from "@/shared/constants";

import {
  EditableNewsSchema,
  NewsActionResponseSchema,
  NewsItemSchema,
  NewsResponseSchema,
} from "../model/schemas";
import { type CreateNewsPayload, type EditableNews } from "../model/types";

export const createNews = async (payload: CreateNewsPayload) => {
  const { data } = await api.post(API_ROUTES.NEWS, payload);

  return NewsActionResponseSchema.parse(data);
};

export const getNews = async () => {
  const { data } = await api.get(API_ROUTES.NEWS);

  return NewsResponseSchema.parse(data);
};

export const getNewsById = async (id: number) => {
  const { data } = await api.get(`${API_ROUTES.NEWS}/${id}`);

  return NewsItemSchema.parse(data);
};

export const getNewsByIdForEdit = async (id: number): Promise<EditableNews> => {
  const { data } = await api.get(`${API_ROUTES.NEWS}/${id}/edit`);

  return EditableNewsSchema.parse(data);
};

export const toggleNewsArchive = async (id: number) => {
  const { data } = await api.patch(`${API_ROUTES.NEWS}/${id}/archive`);

  return NewsActionResponseSchema.parse(data);
};

export const deleteNews = async (id: number) => {
  const { data } = await api.delete(`${API_ROUTES.NEWS}/${id}`);

  return NewsActionResponseSchema.parse(data);
};

export const updateNews = async (id: number, payload: CreateNewsPayload) => {
  const { data } = await api.put(`${API_ROUTES.NEWS}/${id}`, payload);

  return NewsActionResponseSchema.parse(data);
};
