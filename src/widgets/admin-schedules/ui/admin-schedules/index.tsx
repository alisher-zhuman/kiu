"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";

import {
  getSchedulesByLevel,
  SCHEDULE_LEVEL_OPTIONS,
  SCHEDULE_SECTION_OPTIONS,
  type ScheduleItem,
} from "@/entities/schedules";

import { QUERY_KEYS } from "@/shared/constants";
import { cn } from "@/shared/helpers";
import { AdminCollectionState } from "@/shared/ui/admin-collection-state";
import { AdminPageShell } from "@/shared/ui/admin-page-shell";

import { DocumentsSidebar } from "@/widgets/documents/ui/documents-sidebar";

import { ScheduleCard } from "../schedule-card";

const SECTION_KEY_MAP: Record<string, keyof ReturnType<typeof normalizeData>> = {
  THEOLOGY: "theologySchedules",
  PHILOLOGY: "philologySchedules",
  SHARIAT: "shariatSchedule",
};

const normalizeData = (data: {
  theologySchedules: ScheduleItem[];
  philologySchedules: ScheduleItem[];
  shariatSchedule: ScheduleItem[];
}) => data;

export const AdminSchedules = () => {
  const t = useTranslations("AdminSchedulesPage");

  const [activeLevel, setActiveLevel] = useState<string>(SCHEDULE_LEVEL_OPTIONS[0]);
  const [activeSection, setActiveSection] = useState<string>(SCHEDULE_SECTION_OPTIONS[0]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    const tab = tabRefs.current[SCHEDULE_LEVEL_OPTIONS.indexOf(activeLevel as typeof SCHEDULE_LEVEL_OPTIONS[number])];
    if (!container || !tab) return;
    const containerCenter = container.offsetWidth / 2;
    const tabCenter = tab.offsetLeft + tab.offsetWidth / 2;
    container.scrollTo({ left: tabCenter - containerCenter, behavior: "smooth" });
  }, [activeLevel]);

  const { data, error, isLoading } = useQuery({
    queryKey: QUERY_KEYS.adminSchedules(activeLevel),
    queryFn: () => getSchedulesByLevel(activeLevel),
  });

  const sectionKey = SECTION_KEY_MAP[activeSection];
  const activeItems = sectionKey && data ? data[sectionKey] : [];

  const sectionTabs = SCHEDULE_SECTION_OPTIONS.map((key) => ({
    key,
    label: t(`sections.${key}`),
  }));

  return (
    <AdminPageShell ariaLabel={t("sectionLabel")}>
      {/* Горизонтальные табы курса */}
      <div
        ref={scrollContainerRef}
        role="tablist"
        aria-label={t("sectionLabel")}
        className="flex overflow-x-auto"
      >
        {SCHEDULE_LEVEL_OPTIONS.map((level, index) => (
          <button
            key={level}
            ref={(el) => { tabRefs.current[index] = el; }}
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
            isEmpty={!activeItems.length}
            isLoading={isLoading}
            loadingLabel={t("loading")}
          >
            <div className="grid items-stretch gap-3 md:gap-4 lg:grid-cols-2 xl:grid-cols-3">
              {activeItems.map((item) => (
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

      {/* Мобайл: сайдбар-секции как горизонтальный скролл */}
      <div
        role="tablist"
        aria-label={t("sectionLabel")}
        className="flex overflow-x-auto md:hidden"
      >
        {sectionTabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={activeSection === tab.key}
            onClick={() => setActiveSection(tab.key)}
            className={cn(
              "shrink-0 border-b-2 px-4 py-3 text-center text-sm transition-all duration-200",
              activeSection === tab.key
                ? "border-[#004C97] font-semibold text-[#004C97]"
                : "border-black/10 font-normal text-black/40",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </AdminPageShell>
  );
};
