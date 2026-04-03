"use client";

import { ProfessorForm } from "@/entities/professors";

import { useAddProfessorForm } from "../../hooks/useAddProfessorForm";

export const AddProfessorForm = () => {
  const form = useAddProfessorForm();

  return <ProfessorForm {...form} submitLabel={form.t("submit")} />;
};
