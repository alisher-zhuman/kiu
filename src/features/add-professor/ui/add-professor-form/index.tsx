"use client";

import { ProfessorForm, useProfessorForm } from "@/entities/professors";

export const AddProfessorForm = () => {
  const form = useProfessorForm({ mode: "add" });

  return <ProfessorForm {...form} submitLabel={form.t("submit")} />;
};
