import { api } from "@/shared/configs";
import { API_ROUTES } from "@/shared/constants";

import { NewsItemSchema, NewsResponseSchema } from "../model/schemas";

export const getNews = async () => {
  const { data } = await api.get(API_ROUTES.NEWS);

  return NewsResponseSchema.parse(data);
};

export const getNewsById = async (id: number) => {
  const { data } = await api.get(`${API_ROUTES.NEWS}/${id}`);

  return NewsItemSchema.parse(data);
};
