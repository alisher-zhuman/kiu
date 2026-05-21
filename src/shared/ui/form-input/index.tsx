import { type ComponentProps } from "react";

import { cn } from "@/shared/helpers";

interface Props extends ComponentProps<"input"> {
  hasError?: boolean;
}

export const FormInput = ({ className, hasError, ...rest }: Props) => (
  <input
    className={cn(
      "w-full rounded-[0.95rem] border border-black/10 bg-white px-4 py-3 text-base text-black outline-none transition-colors placeholder:text-black/35 focus:border-[#004C97]",
      hasError && "border-red-500 focus:border-red-500",
      className,
    )}
    {...rest}
  />
);
