"use client";

import { AddDocumentForm } from "@/features/add-document";

import { AdminPageShell } from "@/shared/ui/admin-page-shell";

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
