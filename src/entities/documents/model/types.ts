import { type z } from "zod";

import { type DocumentItemSchema } from "./schemas";

export interface CreateDocumentPayload {
  content: string;
  docType: string;
  title: string;
}

export type DocumentItem = z.infer<typeof DocumentItemSchema>;
