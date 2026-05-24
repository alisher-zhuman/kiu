"use client";

import { AddNewsForm } from "@/features/add-news";

import { AdminFormShell } from "@/shared/ui/admin-form-shell";

export const AddNews = () => (
  <AdminFormShell backHref="/admin/news">
    <AddNewsForm />
  </AdminFormShell>
);
