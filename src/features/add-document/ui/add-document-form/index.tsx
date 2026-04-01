"use client";

import { useAddDocumentForm } from "../../hooks/useAddDocumentForm";
import { DocumentForm } from "../document-form";

export const AddDocumentForm = () => {
  const form = useAddDocumentForm();

  return <DocumentForm {...form} submitLabel={form.t("submit")} />;
};
