"use client";

import { type ReactNode } from "react";
import { useLocale } from "next-intl";

import { usePathname } from "@/i18n/navigation";

import { PageRevealFrame } from "./frame";

interface Props {
  children: ReactNode;
}

export const PageReveal = ({ children }: Props) => {
  const locale = useLocale();

  const pathname = usePathname();

  return (
    <PageRevealFrame key={`${locale}:${pathname}`}>{children}</PageRevealFrame>
  );
};
