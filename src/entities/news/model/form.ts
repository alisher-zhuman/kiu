import { z } from "zod";

import { type CreateNewsPayload, type EditableNews } from "./types";

export const MAX_NEWS_IMAGES_COUNT = 2;
export const MAX_NEWS_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

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

export type NewsFormValues = z.infer<ReturnType<typeof createNewsFormSchema>>;

export const createDefaultNewsFormValues = (): NewsFormValues => ({
  images: [],
  title: {
    en: "",
    kg: "",
    ru: "",
  },
  description: {
    en: "",
    kg: "",
    ru: "",
  },
});

export const mapEditableNewsToFormValues = (
  news: EditableNews,
): NewsFormValues => ({
  images: news.images,
  title: news.title,
  description: news.description,
});

export const mapNewsFormValuesToPayload = (
  values: NewsFormValues,
): CreateNewsPayload => ({
  images: values.images,
  title: values.title,
  description: values.description,
});
