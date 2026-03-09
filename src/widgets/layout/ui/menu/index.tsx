"use client";

import { Menu as MenuIcon, X } from "lucide-react";

import { cn } from "@/shared/helpers";

interface Props {
  isOpen: boolean;
  menuLabel: string;
  closeMenuLabel: string;
  onToggle: () => void;
}

export const Menu = ({
  isOpen,
  menuLabel,
  closeMenuLabel,
  onToggle,
}: Props) => (
  <div className="size-10 shrink-0 md:size-12">
    <button
      type="button"
      aria-expanded={isOpen}
      aria-controls="mobile-navbar"
      aria-label={isOpen ? closeMenuLabel : menuLabel}
      onClick={onToggle}
      className="relative flex size-10 items-center justify-center text-black transition-transform duration-200 md:hidden"
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute transition-all duration-200",
          isOpen
            ? "rotate-90 scale-75 opacity-0"
            : "rotate-0 scale-100 opacity-100",
        )}
      >
        <MenuIcon size={28} strokeWidth={1.75} />
      </span>

      <span
        aria-hidden="true"
        className={cn(
          "absolute transition-all duration-200",
          isOpen
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-90 scale-75 opacity-0",
        )}
      >
        <X size={28} strokeWidth={1.75} />
      </span>
    </button>
  </div>
);
