"use client";

import {
  startTransition,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from "react";
import { useLocale, useTranslations } from "next-intl";
import { Globe } from "lucide-react";

import { usePathname, useRouter } from "@/i18n/navigation";
import { type AppLocale } from "@/i18n/routing";

import { getLocaleLabels, LOCALE_OPTIONS } from "@/shared/constants";
import { cn } from "@/shared/helpers";

interface Props {
  className?: string;
}

export const LangSwitcher = ({ className }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const t = useTranslations("LangSwitcher");

  const currentLocale = useLocale() as AppLocale;
  const pathname = usePathname();
  const router = useRouter();

  const triggerRef = useRef<HTMLButtonElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const localeLabels = getLocaleLabels(t);
  const currentOption = localeLabels[currentLocale];

  const closeMenu = () => {
    if (panelRef.current?.contains(document.activeElement)) {
      triggerRef.current?.focus();
    }

    setIsOpen(false);
  };

  const closeDropdown = useEffectEvent((event: MouseEvent) => {
    if (rootRef.current?.contains(event.target as Node)) {
      return;
    }

    closeMenu();
  });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    document.addEventListener("mousedown", closeDropdown);

    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, [isOpen]);

  const handleLocaleChange = (nextLocale: AppLocale) => {
    if (nextLocale === currentLocale) {
      closeMenu();
      return;
    }

    closeMenu();

    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls="language-switcher-panel"
        aria-label={t("triggerLabel")}
        onClick={() => setIsOpen((current) => !current)}
        className={cn(
          "flex cursor-pointer items-center gap-1 text-xs font-light text-black md:gap-2 md:text-xl",
          className,
        )}
      >
        <span>{currentOption.shortLabel}</span>

        <Globe
          className="h-4.5 w-4.5 md:h-7 md:w-7"
          size={28}
          strokeWidth={1.75}
        />
      </button>

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
              onClick={() => handleLocaleChange(locale)}
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
    </div>
  );
};
