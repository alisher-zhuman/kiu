"use client";

import { type ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";

import { QUERY_CLIENT } from "@/shared/configs/query";

interface Props {
  children: ReactNode;
}

export const ReactQueryProvider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={QUERY_CLIENT}>{children}</QueryClientProvider>
  );
};
