"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { cn } from "@/shared/helpers";
import { type Section } from "@/shared/types";
import { SectionsAccordion } from "@/shared/ui/sections-accordion";

interface Department {
  name: string;
  sections: ReadonlyArray<Section>;
}

export const Departments = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const t = useTranslations("DepartmentsPage");
  const departments = t.raw("departments") as ReadonlyArray<Department>;
  const activeDept = (departments[activeIndex] ?? departments[0])!;

  return (
    <main className="mx-auto max-w-400 px-5 py-10 text-black md:px-10 md:py-16">
      <section aria-labelledby="departments-title" className="space-y-8 md:space-y-10">
        <div className="border-l-2 border-black pl-3 md:pl-4">
          <h1
            id="departments-title"
            className="text-2xl font-bold tracking-tight sm:text-3xl md:text-5xl"
          >
            {t("title")}
          </h1>
        </div>

        {/* Mobile: horizontal scroll tabs */}
        <div
          role="tablist"
          aria-label={t("title")}
          className="flex gap-2 overflow-x-auto pb-1 md:hidden"
        >
          {departments.map((dept, index) => (
            <button
              key={dept.name}
              type="button"
              role="tab"
              aria-selected={activeIndex === index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "shrink-0 rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-200",
                activeIndex === index
                  ? "bg-[#004C97] text-white"
                  : "bg-black/6 text-black hover:bg-black/8",
              )}
            >
              {dept.name}
            </button>
          ))}
        </div>

        {/* Mobile: accordion */}
        <div role="tabpanel" className="md:hidden">
          <SectionsAccordion key={activeIndex} sections={activeDept.sections} />
        </div>

        {/* Desktop: accordion left + vertical tabs right */}
        <div className="hidden md:flex md:items-start md:gap-10">
          <div className="min-w-0 flex-1">
            <SectionsAccordion key={activeIndex} sections={activeDept.sections} />
          </div>

          <nav
            aria-label={t("title")}
            className="w-64 shrink-0 space-y-2 pt-5"
          >
            {departments.map((dept, index) => (
              <button
                key={dept.name}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "w-full rounded-2xl px-5 py-4 text-left text-base font-medium transition-colors duration-200",
                  activeIndex === index
                    ? "bg-[#004C97] text-white"
                    : "bg-black/6 text-black hover:bg-black/8",
                )}
              >
                {dept.name}
              </button>
            ))}
          </nav>
        </div>
      </section>
    </main>
  );
};
