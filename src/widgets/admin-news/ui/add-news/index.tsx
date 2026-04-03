"use client";

import { AdminPageShell } from "@/widgets/layout/ui/admin-page-shell";

import { AddNewsForm } from "@/features/add-news";

export const AddNews = () => {
  return (
    <AdminPageShell
      backHref="/admin/news"
      sectionClassName="space-y-6 md:space-y-8"
    >
        <AddNewsForm />
    </AdminPageShell>
  );
};
