import {
  type CreateNewsPayload,
  type EditableNews,
  type NewsFormValues,
} from "./types";

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
