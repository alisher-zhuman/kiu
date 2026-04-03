"use client";

import { NewsForm, useNewsForm } from "@/entities/news";

export const AddNewsForm = () => {
  const form = useNewsForm({ mode: "add" });

  return <NewsForm {...form} submitLabel={form.t("submit")} />;
};
