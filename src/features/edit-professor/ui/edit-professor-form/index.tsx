"use client";

import { ProfessorForm, useProfessorForm } from "@/entities/professors";

import { AsyncItemState } from "@/shared/ui/async-item-state";

interface Props {
  id: number;
}

export const EditProfessorForm = ({ id }: Props) => {
  const form = useProfessorForm({ id, mode: "edit" });

  return (
    <AsyncItemState
      emptyLabel={form.editT("empty")}
      error={form.professorError}
      errorLabel={form.editT("error")}
      isLoading={form.isProfessorLoading}
      item={form.professor}
      loadingLabel={form.editT("loading")}
      render={() => (
        <ProfessorForm
          {...form}
          submitLabel={form.editT("submit")}
          t={form.fieldsT}
        />
      )}
    />
  );
};
