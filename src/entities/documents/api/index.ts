import { api } from "@/shared/configs";
import { API_ROUTES } from "@/shared/constants";

import {
  DocumentActionResponseSchema,
  DocumentsResponseSchema,
} from "../model/schemas";
import { type CreateDocumentPayload } from "../model/types";

export const createDocument = async (payload: CreateDocumentPayload) => {
  const { data } = await api.post(API_ROUTES.DOCUMENTS, payload);

  return DocumentActionResponseSchema.parse(data);
};

export const getDocumentsByType = async (docType: string) => {
  const { data } = await api.get(API_ROUTES.DOCUMENTS_BY_TYPE, {
    params: { type: docType },
  });

  return DocumentsResponseSchema.parse(data);
};

export const deleteDocument = async (id: number) => {
  const { data } = await api.delete(`${API_ROUTES.DOCUMENTS}/${id}`);

  return DocumentActionResponseSchema.parse(data);
};
