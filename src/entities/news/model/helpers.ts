import { type CreateNewsPayload, type EditableNews, type NewsFormValues } from "./types";

export const createDefaultNewsFormValues = (): NewsFormValues => ({
  dateOfPublication: new Date().toISOString().split("T")[0]!,
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

export const mapEditableNewsToFormValues = (news: EditableNews): NewsFormValues => ({
  dateOfPublication: (news.dateOfPublication ?? "").split("T")[0]!,
  images: news.images,
  title: news.title,
  description: news.description,
});

export const mapNewsFormValuesToPayload = (values: NewsFormValues): CreateNewsPayload => ({
  dateOfPublication: values.dateOfPublication,
  images: values.images,
  title: values.title,
  description: values.description,
});
