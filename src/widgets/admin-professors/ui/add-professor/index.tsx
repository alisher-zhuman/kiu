"use client";

import { AdminPageShell } from "@/widgets/layout/ui/admin-page-shell";

import { AddProfessorForm } from "@/features/add-professor";

export const AddProfessor = () => {
  return (
    <AdminPageShell
      backHref="/admin/professors"
      sectionClassName="space-y-6 md:space-y-8"
    >
        <AddProfessorForm />
    </AdminPageShell>
  );
};
