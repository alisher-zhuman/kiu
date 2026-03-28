import { api } from "@/shared/configs";
import { API_ROUTES } from "@/shared/constants";

import { NewsResponseSchema } from "../model/schemas";

export const getNews = async () => {
  const { data } = await api.get(API_ROUTES.NEWS);

  return NewsResponseSchema.parse(data);
};
