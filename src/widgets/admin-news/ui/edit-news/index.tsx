"use client";

import { EditNewsForm } from "@/features/edit-news";

import { AdminPageShell } from "@/shared/ui/admin-page-shell";

interface Props {
  id: number;
}

export const EditNews = ({ id }: Props) => (
  <AdminPageShell
    backHref="/admin/news"
    sectionClassName="space-y-6 md:space-y-8"
  >
    <EditNewsForm id={id} />
  </AdminPageShell>
);
