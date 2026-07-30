import { type ComponentProps } from "react";

import { cn } from "@/shared/helpers";

export const FilterSelect = ({ children, className, ...rest }: ComponentProps<"select">) => (
  <select
    className={cn(
      "rounded-[0.95rem] border border-black/10 bg-white px-4 py-2.5 text-sm text-black outline-none transition-colors focus:border-[#004C97]",
      className
    )}
    {...rest}
  >
    {children}
  </select>
);
