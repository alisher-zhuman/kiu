import { api } from "@/shared/configs";
import { API_ROUTES } from "@/shared/constants";

import { DocumentsResponseSchema } from "../model/schemas";

export const getDocuments = async () => {
  const { data } = await api.get(API_ROUTES.DOCUMENTS);

  return DocumentsResponseSchema.parse(data);
};
