import { type CreateNewsPayload, type EditableNews } from "@/entities/news";

import { type AddNewsFormValues } from "../types";

export const createDefaultNewsFormValues = (): AddNewsFormValues => ({
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
): AddNewsFormValues => ({
  images: news.images,
  title: news.title,
  description: news.description,
});

export const mapNewsFormValuesToPayload = (
  values: AddNewsFormValues,
): CreateNewsPayload => ({
  images: values.images,
  title: values.title,
  description: values.description,
});
