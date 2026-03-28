import { type ReactNode } from "react";
import { Toaster } from "react-hot-toast";

import { AdminLayout } from "@/widgets/layout/ui/admin-layout";

import { ReactQueryProvider } from "@/shared/providers";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => (
  <ReactQueryProvider>
    <Toaster />

    <AdminLayout>{children}</AdminLayout>
  </ReactQueryProvider>
);

export default Layout;
