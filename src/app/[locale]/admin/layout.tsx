import { type ReactNode } from "react";

import { AdminProvider } from "./providers/admin-provider";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => (
  <AdminProvider>{children}</AdminProvider>
);

export default Layout;
