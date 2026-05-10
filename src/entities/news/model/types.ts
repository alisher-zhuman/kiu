import { type z } from "zod";

import { type createNewsFormSchema, type NewsItemSchema } from "./schemas";

export interface NewsContentField {
  en: string;
  kg: string;
  ru: string;
}

export interface CreateNewsPayload {
  dateOfPublication: string;
  description: NewsContentField;
  images: string[];
  title: NewsContentField;
}

export interface EditableNews {
  dateOfPublication: string;
  description: NewsContentField;
  images: string[];
  title: NewsContentField;
}

export type NewsFormValues = z.infer<ReturnType<typeof createNewsFormSchema>>;
export type NewsItem = z.infer<typeof NewsItemSchema>;
