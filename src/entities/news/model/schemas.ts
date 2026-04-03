import { z } from "zod";

import { MAX_NEWS_IMAGES_COUNT } from "./constants";

export const NewsContentFieldSchema = z.object({
  en: z.string(),
  kg: z.string(),
  ru: z.string(),
});

export const createNewsFormSchema = (t: (key: string) => string) => {
  const localizedTextSchema = (errorKey: string) =>
    z.object({
      en: z.string().trim().min(1, t(errorKey)),
      kg: z.string().trim().min(1, t(errorKey)),
      ru: z.string().trim().min(1, t(errorKey)),
    });

  return z.object({
    images: z
      .array(z.url())
      .min(1, t("errors.images.required"))
      .max(MAX_NEWS_IMAGES_COUNT, t("errors.images.max"))
      .refine(
        (images) =>
          images.every((url) => typeof url === "string" && url.length),
        t("errors.images.required"),
      ),
    title: localizedTextSchema("errors.title.required"),
    description: localizedTextSchema("errors.description.required"),
  });
};

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
