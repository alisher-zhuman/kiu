import { type ReactNode } from "react";
import type { Metadata } from "next";

import { AdminProvider } from "./providers/admin-provider";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => <AdminProvider>{children}</AdminProvider>;

export default Layout;
