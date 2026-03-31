import { api } from "@/shared/configs";
import { API_ROUTES } from "@/shared/constants";

import { ProfessorsResponseSchema } from "../model/schemas";

export const getProfessors = async () => {
  const { data } = await api.get(API_ROUTES.PROFESSORS);

  return ProfessorsResponseSchema.parse(data);
};
