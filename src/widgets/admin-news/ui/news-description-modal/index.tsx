"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";

interface Props {
  description: string;
  formattedDate: string;
  onClose: () => void;
  title: string;
}

export const NewsDescriptionModal = ({
  description,
  formattedDate,
  onClose,
  title,
}: Props) => {
  const t = useTranslations("AdminNewsPage");

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return createPortal(
    <div
      className="fixed inset-0 z-60 overflow-y-auto bg-black/45 p-3 md:p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t("modal.label")}
        className="relative z-61 my-4 flex max-h-[calc(100dvh-1.5rem)] w-full max-w-3xl flex-col rounded-3xl bg-white p-5 shadow-[0_24px_60px_rgba(0,0,0,0.18)] md:my-8 md:max-h-[calc(100dvh-3rem)] md:p-7"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs font-medium text-[#004C97] md:text-sm">
              {formattedDate}
            </p>

            <h2 className="text-lg font-semibold tracking-tight text-black md:text-2xl">
              {title}
            </h2>
          </div>

          <button
            type="button"
            aria-label={t("modal.close")}
            className="shrink-0 rounded-full border border-black/10 p-2 text-black/70 transition-colors hover:border-black/20 hover:text-black"
            onClick={onClose}
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="mt-5 min-h-0 overflow-y-auto pr-1">
          <p className="whitespace-pre-line text-sm leading-7 text-black/75 md:text-base md:leading-8">
            {description}
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
};
