"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

import { type Section } from "@/shared/types";
import { SectionsAccordion } from "@/shared/ui/sections-accordion";

import { DepartmentsMobileTabs } from "./mobile-tabs";
import { DepartmentsSidebar } from "./sidebar";

interface Department {
  name: string;
  sections: ReadonlyArray<Section>;
}

export const Departments = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const t = useTranslations("DepartmentsPage");
  const departments = t.raw("departments") as ReadonlyArray<Department>;
  const activeDept = (departments[activeIndex] ?? departments[0])!;

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    const tab = tabRefs.current[activeIndex];
    if (!container || !tab) return;

    const containerCenter = container.offsetWidth / 2;
    const tabCenter = tab.offsetLeft + tab.offsetWidth / 2;
    container.scrollTo({ left: tabCenter - containerCenter, behavior: "smooth" });
  }, [activeIndex]);

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

        <DepartmentsMobileTabs
          activeIndex={activeIndex}
          departments={departments}
          label={t("title")}
          onSelect={setActiveIndex}
          scrollContainerRef={scrollContainerRef}
          tabRefs={tabRefs}
        />

        <div role="tabpanel" className="md:hidden">
          <SectionsAccordion key={activeIndex} sections={activeDept.sections} />
        </div>

        <div className="hidden md:flex md:items-start md:gap-10">
          <div className="min-w-0 flex-1">
            <SectionsAccordion key={activeIndex} sections={activeDept.sections} />
          </div>

          <DepartmentsSidebar
            activeIndex={activeIndex}
            departments={departments}
            label={t("title")}
            onSelect={setActiveIndex}
          />
        </div>
      </section>
    </main>
  );
};
