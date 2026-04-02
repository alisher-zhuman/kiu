"use client";

import { NewsForm } from "@/features/add-news";

import { getApiErrorMessage } from "@/shared/helpers";

import { useEditNewsForm } from "../../hooks/useEditNewsForm";

interface Props {
  id: number;
}

export const EditNewsForm = ({ id }: Props) => {
  const form = useEditNewsForm({ id });

  if (form.isNewsLoading) {
    return (
      <p className="text-base text-black/60 md:text-lg">
        {form.editT("loading")}
      </p>
    );
  }

  if (form.newsError) {
    return (
      <p className="text-base text-red-600 md:text-lg">
        {getApiErrorMessage(form.newsError, form.editT("error"))}
      </p>
    );
  }

  if (!form.news) {
    return (
      <p className="text-base text-black/60 md:text-lg">
        {form.editT("empty")}
      </p>
    );
  }

  return <NewsForm {...form} submitLabel={form.editT("submit")} />;
};
