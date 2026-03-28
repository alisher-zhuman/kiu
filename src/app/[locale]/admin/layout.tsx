import { type ReactNode } from "react";
import { Toaster } from "react-hot-toast";

import { AdminLayout } from "@/widgets/layout/ui/admin-layout";

import { ReactQueryProvider } from "@/shared/providers";
import { AuthGuard } from "@/shared/ui/auth-quard";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => (
  <ReactQueryProvider>
    <Toaster />

    <AuthGuard>
      <AdminLayout>{children}</AdminLayout>
    </AuthGuard>
  </ReactQueryProvider>
);

export default Layout;
