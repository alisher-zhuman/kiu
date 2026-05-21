import { type ReactNode } from "react";

import { cn } from "@/shared/helpers";

interface Props {
  as?: "h1" | "h2";
  children: ReactNode;
  className?: string;
  id?: string;
}

export const PageTitle = ({ as: Tag = "h1", children, className, id }: Props) => (
  <div className="border-l-2 border-black pl-3 md:pl-4">
    <Tag
      id={id}
      className={cn(
        "text-2xl font-bold tracking-tight sm:text-3xl md:text-5xl",
        className,
      )}
    >
      {children}
    </Tag>
  </div>
);
