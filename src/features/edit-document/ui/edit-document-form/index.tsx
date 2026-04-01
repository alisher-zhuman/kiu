"use client";

import { DocumentForm } from "@/features/add-document/ui/document-form";

import { getApiErrorMessage } from "@/shared/helpers";

import { useEditDocumentForm } from "../../hooks/useEditDocumentForm";

interface Props {
  id: number;
}

export const EditDocumentForm = ({ id }: Props) => {
  const form = useEditDocumentForm({ id });

  if (form.isDocumentLoading) {
    return (
      <p className="text-base text-black/60 md:text-lg">
        {form.editT("loading")}
      </p>
    );
  }

  if (form.documentError) {
    return (
      <p className="text-base text-red-600 md:text-lg">
        {getApiErrorMessage(form.documentError, form.editT("error"))}
      </p>
    );
  }

  if (!form.documentItem) {
    return (
      <p className="text-base text-black/60 md:text-lg">
        {form.editT("empty")}
      </p>
    );
  }

  return <DocumentForm {...form} submitLabel={form.editT("submit")} t={form.fieldsT} />;
};
