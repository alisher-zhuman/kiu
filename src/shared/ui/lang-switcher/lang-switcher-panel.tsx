import { type RefObject } from "react";

import { type AppLocale } from "@/i18n/routing";

import { LOCALE_OPTIONS } from "@/shared/constants";
import { cn } from "@/shared/helpers";

interface LocaleOption {
  label: string;
}

interface Props {
  currentLocale: AppLocale;
  isOpen: boolean;
  localeLabels: Record<AppLocale, LocaleOption>;
  onSelect: (locale: AppLocale) => void;
  panelRef: RefObject<HTMLDivElement | null>;
}

export const LangSwitcherPanel = ({
  currentLocale,
  isOpen,
  localeLabels,
  onSelect,
  panelRef,
}: Props) => (
  <div
    ref={panelRef}
    id="language-switcher-panel"
    aria-hidden={!isOpen}
    className={cn(
      "absolute right-1 z-50 flex flex-col gap-2 overflow-hidden rounded-4xl bg-[#0c56a5] p-4 text-white shadow-[0_20px_60px_rgba(0,0,0,0.25)] transition-all duration-200 ease-out md:right-20 md:-bottom-20 md:origin-top",
      isOpen
        ? "translate-y-0 scale-100 opacity-100"
        : "pointer-events-none invisible translate-y-2 scale-95 opacity-0",
    )}
  >
    {LOCALE_OPTIONS.map((locale, index) => {
      const isActive = locale === currentLocale;
      const isLast = index === LOCALE_OPTIONS.length - 1;
      const option = localeLabels[locale];

      return (
        <button
          key={locale}
          type="button"
          onClick={() => onSelect(locale)}
          className={cn(
            "w-full cursor-pointer text-left font-light leading-none transition-colors md:text-xl",
            isActive ? "text-[#ffea00]" : "text-white hover:text-[#ffea00]",
            !isLast && "border-b border-white/80 pb-2",
          )}
        >
          {option.label}
        </button>
      );
    })}
  </div>
);
