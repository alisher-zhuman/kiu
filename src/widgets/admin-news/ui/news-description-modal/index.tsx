"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";

const ANIMATION_DURATION_MS = 200;

interface Props {
  description: string;
  formattedDate: string;
  isOpen: boolean;
  onClose: () => void;
  onExited: () => void;
  title: string;
}

export const NewsDescriptionModal = ({
  description,
  formattedDate,
  isOpen,
  onClose,
  onExited,
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

  useEffect(() => {
    if (isOpen) {
      return;
    }

    const timeoutId = window.setTimeout(onExited, ANIMATION_DURATION_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isOpen, onExited]);

  return createPortal(
    <div
      className={`fixed inset-0 z-60 flex items-center justify-center bg-black/45 p-3 transition-opacity duration-200 md:p-6 ${
        isOpen ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      onClick={
        isOpen
          ? () => {
              onClose();
            }
          : undefined
      }
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t("modal.label")}
        className={`relative z-61 w-full max-w-3xl transform-gpu overflow-hidden rounded-3xl bg-white shadow-[0_24px_60px_rgba(0,0,0,0.18)] transition-all duration-200 ${
          isOpen
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-2 scale-[0.985] opacity-0"
        }`}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <button
          type="button"
          aria-label={t("modal.close")}
          className="absolute cursor-pointer top-4 right-4 z-10 rounded-full border border-black/10 bg-white p-2 text-black/70 transition-colors hover:border-black/20 hover:text-black"
          onClick={onClose}
        >
          <X className="size-4" />
        </button>

        <div className="max-h-[calc(100dvh-6rem)] space-y-5 overflow-y-auto p-5 pr-4 md:max-h-[calc(100dvh-4rem)] md:space-y-6 md:p-7 md:pr-6">
          <div className="space-y-2 pr-10">
            <p className="text-xs font-medium text-[#004C97] md:text-sm">
              {formattedDate}
            </p>

            <h2 className="text-lg font-semibold tracking-tight text-black md:text-2xl">
              {title}
            </h2>
          </div>

          <p className="whitespace-pre-line text-sm leading-7 text-black/75 md:text-base md:leading-8">
            {description}
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
};
