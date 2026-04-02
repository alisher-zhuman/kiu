import { z } from "zod";

export const NewsContentFieldSchema = z.object({
  en: z.string(),
  kg: z.string(),
  ru: z.string(),
});

export const NewsItemSchema = z.object({
  id: z.number(),
  images: z.array(z.string()),
  title: z.string(),
  description: z.string(),
  dateOfPublication: z.string(),
  archived: z.boolean(),
});

export const EditableNewsSchema = z.object({
  images: z.array(z.string()),
  title: NewsContentFieldSchema,
  description: NewsContentFieldSchema,
});

export const NewsActionResponseSchema = z.object({
  message: z.string(),
});

export const NewsResponseSchema = z.array(NewsItemSchema);
