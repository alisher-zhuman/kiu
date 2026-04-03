"use client";

import { EditProfessorForm } from "@/features/edit-professor";

import { AdminPageShell } from "@/shared/ui/admin-page-shell";

interface Props {
  id: number;
}

export const EditProfessor = ({ id }: Props) => (
  <AdminPageShell
    backHref="/admin/professors"
    sectionClassName="space-y-6 md:space-y-8"
  >
    <EditProfessorForm id={id} />
  </AdminPageShell>
);
