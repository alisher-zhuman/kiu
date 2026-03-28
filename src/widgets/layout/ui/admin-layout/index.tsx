import { type ReactNode } from "react";

import { PageReveal } from "@/shared/ui/page-reveal";

import { AdminTabs } from "../admin-tabs";
import { Header } from "../header";

interface Props {
  children: ReactNode;
}

export const AdminLayout = ({ children }: Props) => (
  <>
    <Header mode="admin" />
    <AdminTabs />
    <PageReveal>{children}</PageReveal>
  </>
);
