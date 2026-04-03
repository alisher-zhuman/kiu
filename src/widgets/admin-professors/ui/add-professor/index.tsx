"use client";

import { AddProfessorForm } from "@/features/add-professor";

import { AdminPageShell } from "@/shared/ui/admin-page-shell";

export const AddProfessor = () => (
  <AdminPageShell
    backHref="/admin/professors"
    sectionClassName="space-y-6 md:space-y-8"
  >
    <AddProfessorForm />
  </AdminPageShell>
);
