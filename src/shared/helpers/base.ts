import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { type LinkAction } from "@/shared/types";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const checkExternalHref = (href: string) => {
  return href.startsWith("http://") || href.startsWith("https://");
};

export const handleLinkAction = ({
  downloadFileName,
  href,
  openInNewTab,
}: LinkAction) => {
  if (openInNewTab) {
    window.open(href, "_blank", "noopener,noreferrer");
  }

  if (!downloadFileName) {
    return;
  }

  const downloadLink = document.createElement("a");

  downloadLink.href = href;
  downloadLink.download = downloadFileName;
  downloadLink.rel = "noreferrer";
  downloadLink.style.display = "none";

  document.body.append(downloadLink);
  downloadLink.click();
  downloadLink.remove();
};
