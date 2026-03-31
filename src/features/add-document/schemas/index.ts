import { z } from "zod";

import {
  DOCUMENT_TYPE_OPTIONS,
  MAX_DOCUMENT_FILE_SIZE_BYTES,
} from "../constants";

export const createAddDocumentFormSchema = (
  t: (key: string) => string,
) => {
  return z.object({
    content: z.string().trim().min(1, t("errors.file.required")),
    docType: z.enum(DOCUMENT_TYPE_OPTIONS, {
      error: () => t("errors.docType.required"),
    }),
    title: z.string().trim().min(1, t("errors.title.required")),
  });
};

export { DOCUMENT_TYPE_OPTIONS, MAX_DOCUMENT_FILE_SIZE_BYTES };
