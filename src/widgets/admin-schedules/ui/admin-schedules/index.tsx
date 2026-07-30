"use client";

import { useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";

import { getSchedulesByLevel, SCHEDULE_LEVEL_OPTIONS } from "@/entities/schedules";

import { FACULTY_SECTION_OPTIONS, QUERY_KEYS } from "@/shared/constants";
import { cn } from "@/shared/helpers";
import { useTabScroll } from "@/shared/hooks";
import { useSearchParamState } from "@/shared/hooks";
import { AdminCollectionState } from "@/shared/ui/admin-collection-state";
import { AdminPageShell } from "@/shared/ui/admin-page-shell";
import { AdminSidebarLayout } from "@/shared/ui/admin-sidebar-layout";
import { FilterSelect } from "@/shared/ui/filter-select";
import { TabSidebar } from "@/shared/ui/tab-sidebar";

import { ScheduleCard } from "../schedule-card";

export const AdminSchedules = () => {
  const [activeLevel, setActiveLevel] = useSearchParamState(
    "level",
    SCHEDULE_LEVEL_OPTIONS[0],
    SCHEDULE_LEVEL_OPTIONS
  );
  const [activeSection, setActiveSection] = useSearchParamState(
    "section",
    FACULTY_SECTION_OPTIONS[0],
    FACULTY_SECTION_OPTIONS
  );

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const locale = useLocale();

  const t = useTranslations("AdminSchedulesPage");

  useTabScroll(
    SCHEDULE_LEVEL_OPTIONS.indexOf(activeLevel as (typeof SCHEDULE_LEVEL_OPTIONS)[number]),
    scrollContainerRef,
    tabRefs
  );

  const { data, error, isLoading } = useQuery({
    queryKey: QUERY_KEYS.adminSchedules(locale, activeLevel, activeSection),
    queryFn: () => getSchedulesByLevel(activeLevel, activeSection),
  });

  const sectionTabs = FACULTY_SECTION_OPTIONS.map((key) => ({
    key,
    label: t(`sections.${key}`),
  }));

  return (
    <AdminPageShell ariaLabel={t("sectionLabel")}>
      <div className="flex gap-3 md:hidden">
        <FilterSelect
          value={activeLevel}
          onChange={(e) => setActiveLevel(e.target.value)}
          className="flex-1"
        >
          {SCHEDULE_LEVEL_OPTIONS.map((level) => (
            <option key={level} value={level}>
              {t(`levels.${level}`)}
            </option>
          ))}
        </FilterSelect>

        <FilterSelect
          value={activeSection}
          onChange={(e) => setActiveSection(e.target.value)}
          className="flex-1"
        >
          {FACULTY_SECTION_OPTIONS.map((section) => (
            <option key={section} value={section}>
              {t(`sections.${section}`)}
            </option>
          ))}
        </FilterSelect>
      </div>

      <div
        ref={scrollContainerRef}
        role="tablist"
        aria-label={t("sectionLabel")}
        className="hidden overflow-x-auto md:flex"
      >
        {SCHEDULE_LEVEL_OPTIONS.map((level, index) => (
          <button
            key={level}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            type="button"
            role="tab"
            aria-selected={activeLevel === level}
            onClick={() => setActiveLevel(level)}
            className={cn(
              "shrink-0 border-b-2 px-4 py-3 text-center text-sm transition-all duration-200",
              activeLevel === level
                ? "border-[#004C97] font-semibold text-[#004C97]"
                : "border-black/10 font-normal text-black/60"
            )}
          >
            {t(`levels.${level}`)}
          </button>
        ))}
      </div>

      <AdminSidebarLayout
        sidebar={
          <TabSidebar
            activeKey={activeSection}
            label={t("sectionLabel")}
            onSelect={setActiveSection}
            tabs={sectionTabs}
          />
        }
      >
        <AdminCollectionState
          emptyLabel={t("empty")}
          error={error}
          errorLabel={t("error")}
          isEmpty={!data?.length}
          isLoading={isLoading}
          loadingLabel={t("loading")}
        >
          <div className="grid items-stretch gap-3 md:gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {data?.map((item) => (
              <ScheduleCard key={item.id} item={item} />
            ))}
          </div>
        </AdminCollectionState>
      </AdminSidebarLayout>
    </AdminPageShell>
  );
};
