import { type ComponentProps } from "react";

import { cn } from "@/shared/helpers";

interface Props extends ComponentProps<"select"> {
  hasError?: boolean;
}

export const FormSelect = ({ children, className, hasError, ...rest }: Props) => (
  <select
    className={cn(
      "w-full rounded-[0.95rem] border border-black/10 bg-white px-4 py-3 text-base text-black outline-none transition-colors focus:border-[#004C97] focus-visible:ring-2 focus-visible:ring-[#004C97] focus-visible:ring-offset-2",
      hasError && "border-red-500 focus:border-red-500",
      className
    )}
    {...rest}
  >
    {children}
  </select>
);
