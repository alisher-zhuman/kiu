import { z } from "zod";

import { MAX_DOCUMENT_FILE_SIZE_BYTES } from "../constants";

export const createAddDocumentFormSchema = (
  t: (key: string) => string,
) => {
  return z.object({
    content: z.string().trim().min(1, t("errors.file.required")),
    title: z.string().trim().min(1, t("errors.title.required")),
  });
};

export { MAX_DOCUMENT_FILE_SIZE_BYTES };
