"use client";

import { AddDocumentForm } from "@/features/add-document";

import { AdminFormShell } from "@/shared/ui/admin-form-shell";

export const AddDocument = () => (
  <AdminFormShell backHref="/admin/documents">
    <AddDocumentForm />
  </AdminFormShell>
);
