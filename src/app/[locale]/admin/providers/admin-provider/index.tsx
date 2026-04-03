"use client";

import { type ReactNode, useState } from "react";
import { Toaster } from "react-hot-toast";
import { QueryClientProvider } from "@tanstack/react-query";

import { QUERY_CLIENT } from "@/shared/configs/query";

interface Props {
  children: ReactNode;
}

export const AdminProvider = ({ children }: Props) => {
  const [queryClient] = useState(QUERY_CLIENT);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      {children}
    </QueryClientProvider>
  );
};
