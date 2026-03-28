import { type ReactNode } from "react";

import { AdminLayout } from "@/widgets/layout/ui/admin-layout";

import { AuthGuard } from "@/shared/ui/auth-quard";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => (
  <AuthGuard>
    <AdminLayout>{children}</AdminLayout>
  </AuthGuard>
);

export default Layout;
