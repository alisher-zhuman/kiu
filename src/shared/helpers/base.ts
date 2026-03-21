import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const isExternalHref = (href: string) => {
  return href.startsWith("http://") || href.startsWith("https://");
};
