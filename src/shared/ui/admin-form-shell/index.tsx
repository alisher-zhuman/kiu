"use client";

import { type ReactNode } from "react";

import { AdminPageShell } from "@/shared/ui/admin-page-shell";

interface Props {
  backHref: string;
  children: ReactNode;
}

export const AdminFormShell = ({ backHref, children }: Props) => (
  <AdminPageShell backHref={backHref} sectionClassName="space-y-6 md:space-y-8">
    {children}
  </AdminPageShell>
);
