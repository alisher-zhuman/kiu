import { z } from "zod";

export const NewsContentFieldSchema = z.object({
  en: z.string(),
  kg: z.string(),
  ru: z.string(),
});

const EditableNewsContentFieldSchema = z
  .object({
    ENGLISH: z.string(),
    KYRGYZ: z.string(),
    RUSSIAN: z.string(),
  })
  .transform((field) => ({
    en: field.ENGLISH,
    kg: field.KYRGYZ,
    ru: field.RUSSIAN,
  }));

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
  title: EditableNewsContentFieldSchema,
  description: EditableNewsContentFieldSchema,
});

export const NewsActionResponseSchema = z.object({
  message: z.string(),
});

export const NewsResponseSchema = z.array(NewsItemSchema);
