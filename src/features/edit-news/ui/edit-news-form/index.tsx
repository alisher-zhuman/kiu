"use client";

import { NewsForm, useNewsForm } from "@/entities/news";

import { AsyncItemState } from "@/shared/ui/async-item-state";

interface Props {
  id: number;
}

export const EditNewsForm = ({ id }: Props) => {
  const form = useNewsForm({ id, mode: "edit" });

  return (
    <AsyncItemState
      emptyLabel={form.editT("empty")}
      error={form.newsError}
      errorLabel={form.editT("error")}
      isLoading={form.isNewsLoading}
      item={form.news}
      loadingLabel={form.editT("loading")}
      render={() => <NewsForm {...form} submitLabel={form.editT("submit")} />}
    />
  );
};
