"use client";

import { ProfessorForm } from "@/features/add-professor/ui/professor-form";

import { getApiErrorMessage } from "@/shared/helpers";

import { useEditProfessorForm } from "../../hooks/useEditProfessorForm";

interface Props {
  id: number;
}

export const EditProfessorForm = ({ id }: Props) => {
  const form = useEditProfessorForm({ id });

  if (form.isProfessorLoading) {
    return (
      <p className="text-base text-black/60 md:text-lg">
        {form.editT("loading")}
      </p>
    );
  }

  if (form.professorError) {
    return (
      <p className="text-base text-red-600 md:text-lg">
        {getApiErrorMessage(form.professorError, form.editT("error"))}
      </p>
    );
  }

  if (!form.professor) {
    return <p className="text-base text-black/60 md:text-lg">{form.editT("empty")}</p>;
  }

  return <ProfessorForm {...form} submitLabel={form.editT("submit")} t={form.fieldsT} />;
};
