"use client";

import { startTransition, useEffect, useEffectEvent, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Globe } from "lucide-react";

import { usePathname, useRouter } from "@/i18n/navigation";
import { type AppLocale } from "@/i18n/routing";

import { getLocaleLabels } from "@/shared/constants";
import { cn } from "@/shared/helpers";

import { LangSwitcherPanel } from "../lang-switcher-panel";

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
    if (rootRef.current?.contains(event.target as Node)) return;
    closeMenu();
  });

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("mousedown", closeDropdown);
    return () => document.removeEventListener("mousedown", closeDropdown);
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
          className
        )}
      >
        <span>{currentOption.shortLabel}</span>

        <Globe className="h-4.5 w-4.5 md:h-7 md:w-7" size={28} strokeWidth={1.75} />
      </button>

      <LangSwitcherPanel
        currentLocale={currentLocale}
        isOpen={isOpen}
        localeLabels={localeLabels}
        onSelect={handleLocaleChange}
        panelRef={panelRef}
      />
    </div>
  );
};
