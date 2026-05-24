"use client";

import { EditProfessorForm } from "@/features/edit-professor";

import { AdminFormShell } from "@/shared/ui/admin-form-shell";

interface Props {
  id: number;
}

export const EditProfessor = ({ id }: Props) => (
  <AdminFormShell backHref="/admin/professors">
    <EditProfessorForm id={id} />
  </AdminFormShell>
);
