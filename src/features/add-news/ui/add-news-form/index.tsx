"use client";

import { NewsForm } from "@/entities/news/ui/news-form";

import { useAddNewsForm } from "../../hooks/useAddNewsForm";

export const AddNewsForm = () => {
  const form = useAddNewsForm();

  return <NewsForm {...form} submitLabel={form.t("submit")} />;
};
