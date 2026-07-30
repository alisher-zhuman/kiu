"use client";

import { useTranslations } from "next-intl";
import { ArrowLeft } from "lucide-react";

import { usePathname, useRouter } from "@/i18n/navigation";

export const BackButton = () => {
  const pathname = usePathname();
  const router = useRouter();

  const t = useTranslations("Layout");

  if (pathname === "/") {
    return null;
  }

  const handleClick = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push("/");
  };

  return (
    <div className="max-w-400 m-auto px-5 pt-4 md:px-10 md:pt-6">
      <button
        type="button"
        onClick={handleClick}
        className="group inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-black/55 transition-all duration-200 hover:-translate-y-px hover:text-[#004C97] md:text-base"
      >
        <ArrowLeft
          aria-hidden="true"
          size={16}
          strokeWidth={1.75}
          className="transition-transform duration-200 group-hover:-translate-x-0.5"
        />

        <span>{t("back")}</span>
      </button>
    </div>
  );
};
