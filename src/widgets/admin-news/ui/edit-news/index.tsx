"use client";

import { AdminPageShell } from "@/widgets/layout/ui/admin-page-shell";

import { EditNewsForm } from "@/features/edit-news";

interface Props {
  id: number;
}

export const EditNews = ({ id }: Props) => {
  return (
    <AdminPageShell
      backHref="/admin/news"
      sectionClassName="space-y-6 md:space-y-8"
    >
        <EditNewsForm id={id} />
    </AdminPageShell>
  );
};
