"use client";

import {
  startTransition,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from "react";
import { useLocale } from "next-intl";
import { Globe } from "lucide-react";

import { usePathname, useRouter } from "@/i18n/navigation";
import { type AppLocale } from "@/i18n/routing";

import { LOCALE_OPTIONS } from "@/shared/constants";
import { cn } from "@/shared/helpers";

export const LangSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);

  const currentLocale = useLocale() as AppLocale;

  const pathname = usePathname();

  const router = useRouter();

  const rootRef = useRef<HTMLDivElement>(null);

  const currentOption =
    LOCALE_OPTIONS.find(({ locale }) => locale === currentLocale) ??
    LOCALE_OPTIONS[0]!;

  const closeDropdown = useEffectEvent((event: MouseEvent) => {
    if (rootRef.current?.contains(event.target as Node)) {
      return;
    }

    setIsOpen(false);
  });

  const closeOnEscape = useEffectEvent((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    document.addEventListener("mousedown", closeDropdown);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("mousedown", closeDropdown);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  const handleLocaleChange = (nextLocale: AppLocale) => {
    if (nextLocale === currentLocale) {
      setIsOpen(false);
      return;
    }

    setIsOpen(false);

    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label="Change language"
        onClick={() => setIsOpen((current) => !current)}
        className="flex cursor-pointer items-center gap-2 rounded-full border border-transparent px-4 py-2 text-xl font-light text-black transition-all duration-200 hover:border-black/20"
      >
        <span>{currentOption.shortLabel}</span>

        <Globe size={28} strokeWidth={1.75} />
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-label="Language options"
          className="absolute right-0 top-full z-20 p-4 overflow-hidden flex flex-col gap-2 rounded-4xl  bg-[#0c56a5] text-white shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
        >
          {LOCALE_OPTIONS.map(({ locale, label }, index) => {
            const isActive = locale === currentLocale;
            const isLast = index === LOCALE_OPTIONS.length - 1;

            return (
              <button
                key={locale}
                type="button"
                role="menuitemradio"
                aria-checked={isActive}
                onClick={() => handleLocaleChange(locale)}
                className={cn(
                  "flex w-full cursor-pointer items-center text-left text-xl leading-none font-light transition-colors",
                  isActive
                    ? "text-[#ffea00]"
                    : "text-white hover:text-[#ffea00]",
                  !isLast && "border-b pb-2 border-white/80",
                )}
              >
                {label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
