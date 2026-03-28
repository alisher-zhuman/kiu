import { type ReactNode } from "react";
import { Toaster } from "react-hot-toast";

import { ReactQueryProvider } from "@/shared/providers";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => (
  <ReactQueryProvider>
    <Toaster />
    {children}
  </ReactQueryProvider>
);

export default Layout;
