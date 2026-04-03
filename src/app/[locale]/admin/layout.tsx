import { type ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { QueryClientProvider } from "@tanstack/react-query";

import { QUERY_CLIENT } from "@/shared/configs";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => (
  <QueryClientProvider client={QUERY_CLIENT}>
    <Toaster />

    {children}
  </QueryClientProvider>
);

export default Layout;
