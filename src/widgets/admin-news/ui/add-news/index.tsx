"use client";

import { AddNewsForm } from "@/features/add-news";

import { AdminPageShell } from "@/shared/ui/admin-page-shell";

export const AddNews = () => (
  <AdminPageShell
    backHref="/admin/news"
    sectionClassName="space-y-6 md:space-y-8"
  >
    <AddNewsForm />
  </AdminPageShell>
);
