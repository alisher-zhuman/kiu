"use client";

import { type ReactNode } from "react";

import { cn } from "@/shared/helpers";
import { useInView } from "@/shared/hooks";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const Reveal = ({ children, className, delay = 0 }: Props) => {
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-500 ease-out motion-reduce:transform-none motion-reduce:transition-none",
        isInView
          ? "translate-y-0 opacity-100"
          : "translate-y-6 opacity-0 motion-reduce:opacity-100",
        className,
      )}
    >
      {children}
    </div>
  );
};
