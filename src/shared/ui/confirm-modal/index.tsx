"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

import { cn } from "@/shared/helpers";

const FOCUSABLE_SELECTOR =
  'button:not(:disabled), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

interface Props {
  cancelLabel: string;
  confirmLabel: string;
  isOpen: boolean;
  isPending?: boolean;
  message?: string;
  onCancel: () => void;
  onConfirm: () => void;
  title: string;
  variant?: "danger" | "primary";
}

export const ConfirmModal = ({
  cancelLabel,
  confirmLabel,
  isOpen,
  isPending = false,
  message,
  onCancel,
  onConfirm,
  title,
  variant = "danger",
}: Props) => {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const dialogRef = useRef<HTMLDivElement>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    cancelButtonRef.current?.focus();

    return () => {
      previousFocusRef.current?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCancel();
        return;
      }

      if (e.key !== "Tab") return;

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);

      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (!first || !last) return;

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onCancel]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
      aria-describedby={message ? "confirm-modal-message" : undefined}
      role="dialog"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onCancel}
      />

      <div
        ref={dialogRef}
        className="relative w-full max-w-sm rounded-3xl bg-white px-6 pt-6 pb-5 shadow-[0_24px_64px_rgba(0,0,0,0.18)] md:px-7 md:pt-7 md:pb-6"
      >
        <h2
          id="confirm-modal-title"
          className="text-xl font-bold tracking-tight text-black md:text-2xl"
        >
          {title}
        </h2>

        {message ? (
          <p id="confirm-modal-message" className="mt-2 text-sm text-black/55 md:text-base">
            {message}
          </p>
        ) : null}

        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            ref={cancelButtonRef}
            type="button"
            onClick={onCancel}
            disabled={isPending}
            className="inline-flex items-center justify-center rounded-2xl bg-black/6 px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-black/10 disabled:opacity-50"
          >
            {cancelLabel}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isPending}
            className={cn(
              "inline-flex items-center justify-center rounded-2xl px-5 py-2.5 text-sm font-semibold text-white transition-colors disabled:opacity-50",
              variant === "danger"
                ? "bg-red-500 hover:bg-red-600"
                : "bg-[#004C97] hover:bg-[#002E5C]"
            )}
          >
            {isPending ? "..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
