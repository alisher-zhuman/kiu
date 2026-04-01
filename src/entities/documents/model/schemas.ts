import { z } from "zod";

import { DOCUMENT_TYPE_OPTIONS } from "./constants";

export const DocumentItemSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  docType: z.enum(DOCUMENT_TYPE_OPTIONS),
});

export const DocumentActionResponseSchema = z.object({
  message: z.string(),
});

export const DocumentsResponseSchema = z.array(DocumentItemSchema);
