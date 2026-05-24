"use client";

import { EditNewsForm } from "@/features/edit-news";

import { AdminFormShell } from "@/shared/ui/admin-form-shell";

interface Props {
  id: number;
}

export const EditNews = ({ id }: Props) => (
  <AdminFormShell backHref="/admin/news">
    <EditNewsForm id={id} />
  </AdminFormShell>
);
