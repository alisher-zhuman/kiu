"use client";

import { useAddProfessorForm } from "../../hooks/useAddProfessorForm";
import { ProfessorForm } from "../professor-form";

export const AddProfessorForm = () => {
  const form = useAddProfessorForm();

  return <ProfessorForm {...form} submitLabel={form.t("submit")} />;
};
