"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/shared/helpers";

import { type ProfessorSection } from "../../index";

interface Props {
  errorMessage: string | undefined;
  options: readonly ProfessorSection[];
  placeholder: string;
  selectedSections: ProfessorSection[];
  sectionLabel: (section: ProfessorSection) => string;
  toggleSection: (section: ProfessorSection) => void;
}

export const SectionsSelect = ({
  errorMessage,
  options,
  placeholder,
  sectionLabel,
  selectedSections,
  toggleSection,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const selectedLabel = useMemo(() => {
    if (!selectedSections.length) {
      return placeholder;
    }

    return selectedSections.map(sectionLabel).join(", ");
  }, [placeholder, sectionLabel, selectedSections]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative space-y-2">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className={cn(
          "flex w-full cursor-pointer items-center justify-between gap-3 rounded-[0.95rem] border border-black/10 bg-white px-4 py-3 text-left text-base text-black outline-none transition-colors hover:border-[#004C97]/35",
          isOpen && "border-[#004C97]",
          errorMessage && "border-red-500"
        )}
      >
        <span className={cn("truncate", !selectedSections.length && "text-black/35")}>
          {selectedLabel}
        </span>

        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-black/50 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen ? (
        <div className="absolute z-20 w-full rounded-[0.95rem] border border-black/10 bg-white p-2 shadow-lg">
          <div className="max-h-64 space-y-1 overflow-y-auto">
            {options.map((section) => {
              const isSelected = selectedSections.includes(section);

              return (
                <button
                  key={section}
                  type="button"
                  onClick={() => toggleSection(section)}
                  className={cn(
                    "flex w-full cursor-pointer items-center justify-between gap-3 rounded-[0.85rem] px-3 py-2 text-left text-sm text-black transition-colors hover:bg-black/5",
                    isSelected && "bg-[#004C97]/6"
                  )}
                >
                  <span className="font-medium">{sectionLabel(section)}</span>

                  <span
                    className={cn(
                      "inline-flex size-4 items-center justify-center rounded border border-black/20",
                      isSelected && "border-[#004C97] bg-[#004C97] text-white"
                    )}
                  >
                    {isSelected ? <Check className="size-3" /> : null}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      {errorMessage ? <p className="text-sm text-red-500 md:text-base">{errorMessage}</p> : null}
    </div>
  );
};
