"use client";

import { AddProfessorForm } from "@/features/add-professor";

import { AdminFormShell } from "@/shared/ui/admin-form-shell";

export const AddProfessor = () => (
  <AdminFormShell backHref="/admin/professors">
    <AddProfessorForm />
  </AdminFormShell>
);
