"use client";

import { type ReactNode } from "react";
import { useLocale } from "next-intl";

import { usePathname } from "@/i18n/navigation";

interface Props {
  children: ReactNode;
}

export const PageReveal = ({ children }: Props) => {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div key={`${locale}:${pathname}`} className="page-reveal">
      {children}
    </div>
  );
};
