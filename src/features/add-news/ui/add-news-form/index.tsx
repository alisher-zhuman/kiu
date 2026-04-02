"use client";

import { useAddNewsForm } from "../../hooks/useAddNewsForm";
import { NewsForm } from "../news-form";

export const AddNewsForm = () => {
  const form = useAddNewsForm();

  return <NewsForm {...form} submitLabel={form.t("submit")} />;
};
