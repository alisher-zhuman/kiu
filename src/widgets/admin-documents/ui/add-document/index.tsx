"use client";

import { AdminPageShell } from "@/widgets/layout/ui/admin-page-shell";

import { AddDocumentForm } from "@/features/add-document";

export const AddDocument = () => {
  return (
    <AdminPageShell
      backHref="/admin/documents"
      sectionClassName="space-y-6 md:space-y-8"
    >
        <AddDocumentForm />
    </AdminPageShell>
  );
};
