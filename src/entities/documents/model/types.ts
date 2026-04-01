import { type z } from "zod";

import { type DOCUMENT_TYPE_OPTIONS } from "./constants";
import { type DocumentItemSchema } from "./schemas";

export interface CreateDocumentPayload {
  content: string;
  docType: (typeof DOCUMENT_TYPE_OPTIONS)[number];
  title: string;
}

export type DocumentItem = z.infer<typeof DocumentItemSchema>;
