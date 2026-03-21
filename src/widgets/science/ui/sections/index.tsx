"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/shared/helpers";

import { type ScienceSection } from "../../types";

interface Props {
  sections: ReadonlyArray<ScienceSection>;
}

export const Sections = ({ sections }: Props) => {
  const [openSection, setOpenSection] = useState<number | null>(0);

  return (
    <div className="mt-10 md:mt-16">
      {sections.map(({ title, description, items, note }, index) => {
        const isOpen = openSection === index;
        const isLast = index === sections.length - 1;
        const panelId = `science-section-${index}`;

        return (
          <section
            key={title}
            className={cn(!isLast && "border-b border-black/10")}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() =>
                setOpenSection((current) => (current === index ? null : index))
              }
              className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left md:py-7"
            >
              <h2 className="text-xl font-bold sm:text-2xl md:text-4xl">
                {title}
              </h2>

              <ChevronDown
                size={24}
                strokeWidth={1.75}
                className={cn(
                  "shrink-0 transition-transform duration-300 ease-out",
                  isOpen && "rotate-180",
                )}
              />
            </button>

            <div
              id={panelId}
              className={cn(
                "grid transition-all duration-300 ease-out",
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="space-y-4 pb-6 md:space-y-5 md:pb-8">
                  {description ? (
                    <p className="whitespace-pre-line text-base leading-7 text-black/85 sm:text-lg sm:leading-8 md:text-[1.7rem] md:leading-[1.55]">
                      {description}
                    </p>
                  ) : null}

                  {items ? (
                    <ul className="list-disc space-y-1 pl-5 text-base leading-7 text-black/85 marker:text-black/70 sm:pl-6 sm:text-lg sm:leading-8 md:text-[1.7rem] md:leading-[1.55]">
                      {items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}

                  {note ? (
                    <p className="text-base leading-7 text-black/85 sm:text-lg sm:leading-8 md:text-[1.7rem] md:leading-[1.55]">
                      {note}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};
