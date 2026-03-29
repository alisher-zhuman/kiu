"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";

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
      className="fixed inset-0 z-60 flex items-center justify-center bg-black/45 px-4 py-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t("modal.label")}
        className="relative z-[61] w-full max-w-3xl rounded-3xl bg-white p-5 shadow-[0_24px_60px_rgba(0,0,0,0.18)] md:p-7"
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
            className="shrink-0 rounded-full border border-black/10 px-3 py-1.5 text-sm font-medium text-black/70 transition-colors hover:border-black/20 hover:text-black"
            onClick={onClose}
          >
            {t("modal.close")}
          </button>
        </div>

        <div className="mt-5 max-h-[70vh] overflow-y-auto pr-1">
          <p className="whitespace-pre-line text-sm leading-7 text-black/75 md:text-base md:leading-8">
            {description}
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
};
