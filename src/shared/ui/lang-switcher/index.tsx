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

import { LOCALE_OPTIONS } from "@/shared/constants";
import { cn } from "@/shared/helpers";

export const LangSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);

  const t = useTranslations("LangSwitcher");

  const currentLocale = useLocale() as AppLocale;

  const pathname = usePathname();

  const router = useRouter();

  const rootRef = useRef<HTMLDivElement>(null);

  const localeLabels: Record<AppLocale, { label: string; shortLabel: string }> =
    {
      ru: {
        label: t("locales.ru.label"),
        shortLabel: t("locales.ru.shortLabel"),
      },
      kg: {
        label: t("locales.kg.label"),
        shortLabel: t("locales.kg.shortLabel"),
      },
      en: {
        label: t("locales.en.label"),
        shortLabel: t("locales.en.shortLabel"),
      },
    };

  const currentOption = localeLabels[currentLocale];

  const closeDropdown = useEffectEvent((event: MouseEvent) => {
    if (rootRef.current?.contains(event.target as Node)) {
      return;
    }

    setIsOpen(false);
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
        aria-controls="language-switcher-panel"
        aria-label={t("triggerLabel")}
        onClick={() => setIsOpen((current) => !current)}
        className="flex cursor-pointer items-center gap-2 text-xl font-light text-black"
      >
        <span>{currentOption.shortLabel}</span>

        <Globe size={28} strokeWidth={1.75} />
      </button>

      <div
        id="language-switcher-panel"
        aria-hidden={!isOpen}
        className={cn(
          "absolute right-0 top-full z-20 mt-3 flex origin-top-right flex-col gap-2 overflow-hidden rounded-4xl bg-[#0c56a5] p-4 text-white shadow-[0_20px_60px_rgba(0,0,0,0.25)] transition-all duration-200 ease-out",
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
                "w-full cursor-pointer text-left text-xl leading-none font-light transition-colors",
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
