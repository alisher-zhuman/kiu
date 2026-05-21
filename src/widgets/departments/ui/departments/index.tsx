"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";

import { useSearchParamState, useTabScroll } from "@/shared/hooks";
import { type Section } from "@/shared/types";
import { MobileTabList } from "@/shared/ui/mobile-tab-list";
import { PageTitle } from "@/shared/ui/page-title";
import { SectionsAccordion } from "@/shared/ui/sections-accordion";
import { TabSidebar } from "@/shared/ui/tab-sidebar";

interface Department {
  name: string;
  sections: ReadonlyArray<Section>;
}

export const Departments = () => {
  const t = useTranslations("DepartmentsPage");
  const departments = t.raw("departments") as ReadonlyArray<Department>;

  const deptNames = departments.map((d) => d.name);

  const [activeKey, setActiveKey] = useSearchParamState(
    "dept",
    deptNames[0] ?? "",
    deptNames,
  );

  const activeDept = (departments.find((d) => d.name === activeKey) ?? departments[0])!;
  const activeIndex = departments.findIndex((d) => d.name === activeKey);

  const tabs = departments.map((d) => ({ key: d.name, label: d.name }));

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useTabScroll(activeIndex, scrollContainerRef, tabRefs);

  return (
    <main className="mx-auto max-w-400 px-5 py-10 text-black md:px-10 md:py-16">
      <section aria-labelledby="departments-title" className="space-y-8 md:space-y-10">
        <PageTitle id="departments-title">{t("title")}</PageTitle>

        <MobileTabList
          activeKey={activeKey}
          label={t("title")}
          onSelect={setActiveKey}
          scrollContainerRef={scrollContainerRef}
          tabRefs={tabRefs}
          tabs={tabs}
        />

        <div role="tabpanel" className="md:hidden">
          <SectionsAccordion key={activeKey} sections={activeDept.sections} />
        </div>

        <div className="hidden md:flex md:items-start md:gap-10">
          <div className="min-w-0 flex-1">
            <SectionsAccordion key={activeKey} sections={activeDept.sections} />
          </div>

          <TabSidebar
            activeKey={activeKey}
            label={t("title")}
            onSelect={setActiveKey}
            tabs={tabs}
          />
        </div>
      </section>
    </main>
  );
};
