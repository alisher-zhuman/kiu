import { type ReactNode } from "react";

import { AdminLayout } from "@/widgets/layout/ui/admin-layout";

import { ReactQueryProvider } from "@/shared/providers";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <ReactQueryProvider>
      <AdminLayout>{children}</AdminLayout>
    </ReactQueryProvider>
  );
};

export default Layout;
