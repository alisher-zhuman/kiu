import { z } from "zod";

export const NewsItemSchema = z.object({
  id: z.number(),
  images: z.array(z.string()),
  title: z.string(),
  description: z.string(),
  dateOfPublication: z.string(),
});

export const NewsResponseSchema = z.array(NewsItemSchema);

