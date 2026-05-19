"use client";

import { useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";

import { DocumentsSidebar } from "@/widgets/documents/ui/documents-sidebar";

import {
  getSchedulesByLevel,
  SCHEDULE_LEVEL_OPTIONS,
  SCHEDULE_SECTION_OPTIONS,
} from "@/entities/schedules";

import { QUERY_KEYS } from "@/shared/constants";
import { cn } from "@/shared/helpers";
import { useSearchParamState } from "@/shared/hooks";
import { AdminCollectionState } from "@/shared/ui/admin-collection-state";
import { AdminPageShell } from "@/shared/ui/admin-page-shell";

import { ScheduleCard } from "../schedule-card";

export const AdminSchedules = () => {
  const [activeLevel, setActiveLevel] = useSearchParamState(
    "level",
    SCHEDULE_LEVEL_OPTIONS[0],
    SCHEDULE_LEVEL_OPTIONS,
  );
  const [activeSection, setActiveSection] = useSearchParamState(
    "section",
    SCHEDULE_SECTION_OPTIONS[0],
    SCHEDULE_SECTION_OPTIONS,
  );

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const locale = useLocale();
  const t = useTranslations("AdminSchedulesPage");

  useEffect(() => {
    const container = scrollContainerRef.current;
    const tab =
      tabRefs.current[
        SCHEDULE_LEVEL_OPTIONS.indexOf(
          activeLevel as (typeof SCHEDULE_LEVEL_OPTIONS)[number],
        )
      ];
    if (!container || !tab) return;
    const containerCenter = container.offsetWidth / 2;
    const tabCenter = tab.offsetLeft + tab.offsetWidth / 2;
    container.scrollTo({
      left: tabCenter - containerCenter,
      behavior: "smooth",
    });
  }, [activeLevel]);

  const { data, error, isLoading } = useQuery({
    queryKey: QUERY_KEYS.adminSchedules(locale, activeLevel, activeSection),
    queryFn: () => getSchedulesByLevel(activeLevel, activeSection),
  });

  const sectionTabs = SCHEDULE_SECTION_OPTIONS.map((key) => ({
    key,
    label: t(`sections.${key}`),
  }));

  return (
    <AdminPageShell ariaLabel={t("sectionLabel")}>
      <div className="flex gap-3 md:hidden">
        <select
          value={activeLevel}
          onChange={(e) => setActiveLevel(e.target.value)}
          className="flex-1 rounded-[0.95rem] border border-black/10 bg-white px-4 py-2.5 text-sm text-black outline-none transition-colors focus:border-[#004C97]"
        >
          {SCHEDULE_LEVEL_OPTIONS.map((level) => (
            <option key={level} value={level}>
              {t(`levels.${level}`)}
            </option>
          ))}
        </select>

        <select
          value={activeSection}
          onChange={(e) => setActiveSection(e.target.value)}
          className="flex-1 rounded-[0.95rem] border border-black/10 bg-white px-4 py-2.5 text-sm text-black outline-none transition-colors focus:border-[#004C97]"
        >
          {SCHEDULE_SECTION_OPTIONS.map((section) => (
            <option key={section} value={section}>
              {t(`sections.${section}`)}
            </option>
          ))}
        </select>
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
                : "border-black/10 font-normal text-black/40",
            )}
          >
            {t(`levels.${level}`)}
          </button>
        ))}
      </div>

      <div className="md:flex md:items-start md:gap-10">
        <div className="min-w-0 flex-1">
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
        </div>

        <div className="hidden md:block">
          <DocumentsSidebar
            activeKey={activeSection}
            label={t("sectionLabel")}
            onSelect={setActiveSection}
            tabs={sectionTabs}
          />
        </div>
      </div>
    </AdminPageShell>
  );
};
