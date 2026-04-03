"use client";

import { AdminPageShell } from "@/widgets/layout/ui/admin-page-shell";

import { EditProfessorForm } from "@/features/edit-professor";

interface Props {
  id: number;
}

export const EditProfessor = ({ id }: Props) => {
  return (
    <AdminPageShell
      backHref="/admin/professors"
      sectionClassName="space-y-6 md:space-y-8"
    >
        <EditProfessorForm id={id} />
    </AdminPageShell>
  );
};
