"use client";

import { type ReactNode } from "react";
import { Loader2 } from "lucide-react";

import { cn } from "@/shared/helpers";

interface Props {
  className?: string | undefined;
  iconOnly?: boolean | undefined;
  iconOnlyOnMobile?: boolean | undefined;
  idleLabel: string;
  isPending: boolean;
  mobileIcon: ReactNode;
  onClick: () => void;
  pendingLabel: string;
  variant?: "danger" | "neutral" | "primary" | undefined;
}

const VARIANT_CLASS_NAMES = {
  danger:
    "border-red-500/15 bg-red-500/6 text-red-600 hover:bg-red-500/10",
  neutral: "border-black/10 bg-black/3 text-black/70 hover:bg-black/5",
  primary:
    "border-[#004C97]/15 bg-[#004C97]/6 text-[#004C97] hover:bg-[#004C97]/10",
} as const;

export const AdminActionButton = ({
  className,
  iconOnly = false,
  iconOnlyOnMobile = false,
  idleLabel,
  isPending,
  mobileIcon,
  onClick,
  pendingLabel,
  variant = "primary",
}: Props) => {
  const showIconOnly = iconOnly || iconOnlyOnMobile;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isPending}
      aria-label={isPending ? pendingLabel : idleLabel}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-60",
        showIconOnly
          ? iconOnly
            ? "size-9"
            : "size-9 md:size-auto md:px-4 md:py-2 md:text-sm md:font-semibold"
          : "px-3 py-1.5 text-xs font-medium md:text-sm",
        VARIANT_CLASS_NAMES[variant],
        className,
      )}
    >
      {showIconOnly ? (
        <>
          {isPending ? (
            <Loader2 className={cn("size-4 animate-spin", !iconOnly && "md:hidden")} />
          ) : (
            iconOnly
              ? mobileIcon
              : mobileIcon
          )}
          {!iconOnly ? (
            <span className="hidden md:inline">
              {isPending ? pendingLabel : idleLabel}
            </span>
          ) : null}
        </>
      ) : isPending ? (
        pendingLabel
      ) : (
        idleLabel
      )}
    </button>
  );
};
