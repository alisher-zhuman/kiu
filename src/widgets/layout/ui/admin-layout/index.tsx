import { type ReactNode } from "react";

import { PageReveal } from "@/shared/ui/page-reveal";

import { Header } from "../header";

interface Props {
  children: ReactNode;
}

export const AdminLayout = ({ children }: Props) => (
  <>
    <Header mode="admin" />
    <PageReveal>{children}</PageReveal>
  </>
);
