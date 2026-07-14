import { notFound } from "next/navigation";
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

export const formatDate = (
  date: string | Date,
  locale: string,
  options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  },
) => {
  return new Intl.DateTimeFormat(locale, options).format(new Date(date));
};

export const getFileNameFromUrl = (fileUrl: string) => {
  if (!fileUrl) {
    return "";
  }

  try {
    const normalizedUrl = fileUrl.startsWith("http")
      ? fileUrl
      : `https://placeholder.local${fileUrl}`;
    const { pathname } = new URL(normalizedUrl);
    const rawFileName = pathname.split("/").pop() ?? "";

    return decodeURIComponent(rawFileName);
  } catch {
    return fileUrl.split("/").pop() ?? fileUrl;
  }
};

export const checkIsPdfFile = (file: File) =>
  file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");

export const getPreviewText = (value: string, limit: number) => {
  const normalizedValue = value.trim();

  if (normalizedValue.length <= limit) {
    return normalizedValue;
  }

  return `${normalizedValue.slice(0, limit).trimEnd()}...`;
};

export const parseEntityId = (id: string): number => {
  const parsed = Number(id);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    notFound();
  }

  return parsed;
};
