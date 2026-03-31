import { z } from "zod";

export const DocumentItemSchema = z.object({
  content: z.string(),
  id: z.number(),
  title: z.string(),
  type: z.string(),
});

export const DocumentsResponseSchema = z.array(DocumentItemSchema);
