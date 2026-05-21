"use client";

import { useTranslations } from "next-intl";

import { Link, usePathname, useRouter } from "@/i18n/navigation";

import {
  SCHEDULE_LEVEL_OPTIONS,
  type ScheduleItem,
} from "@/entities/schedules";
import { FACULTY_SECTION_OPTIONS } from "@/shared/constants";

import { cn } from "@/shared/helpers";
import { PageTitle } from "@/shared/ui/page-title";

import { ScheduleCard } from "../schedule-card";
import { ScheduleMobileFilters } from "../schedule-mobile-filters";

interface Props {
  activeLevel: string;
  activeSection: string;
  error?: boolean;
  schedules: ScheduleItem[];
  title: string;
}

export const StudentsSchedule = ({
  activeLevel,
  activeSection,
  error = false,
  schedules,
  title,
}: Props) => {
  const t = useTranslations("StudentsSchedulePage");
  const pathname = usePathname();
  const router = useRouter();

  const buildHref = (level: string, section: string) => {
    const params = new URLSearchParams({ level, section });
    return `${pathname}?${params.toString()}`;
  };

  const content = error ? (
    <div className="rounded-3xl border border-red-200 bg-red-50 px-5 py-4 text-base text-red-600 md:px-6 md:py-5">
      {t("error")}
    </div>
  ) : !schedules.length ? (
    <div className="rounded-3xl border border-black/10 bg-white px-5 py-10 text-center text-base text-black/60 shadow-[0_14px_32px_rgba(0,0,0,0.04)] md:px-6 md:py-12">
      {t("empty")}
    </div>
  ) : (
    <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
      {schedules.map((item) => <ScheduleCard key={item.id} item={item} />)}
    </div>
  );

  return (
    <main className="mx-auto max-w-400 px-5 py-10 text-black md:px-10 md:py-16">
      <section aria-labelledby="schedule-title" className="space-y-8 md:space-y-10">
        <PageTitle id="schedule-title">{title}</PageTitle>

        <ScheduleMobileFilters
          activeLevel={activeLevel}
          activeSection={activeSection}
          onLevelChange={(level) => router.push(buildHref(level, activeSection))}
          onSectionChange={(section) => router.push(buildHref(activeLevel, section))}
        />

        <div className="md:hidden">{content}</div>

        <div className="hidden space-y-0 md:block">
          <div className="flex overflow-x-auto">
            {SCHEDULE_LEVEL_OPTIONS.map((level) => (
              <Link
                key={level}
                href={buildHref(level, activeSection)}
                className={cn(
                  "shrink-0 border-b-2 px-4 py-3 text-center text-sm transition-all duration-200",
                  activeLevel === level
                    ? "border-[#004C97] font-semibold text-[#004C97]"
                    : "border-black/10 font-normal text-black/40 hover:text-black/60",
                )}
              >
                {t(`levels.${level}`)}
              </Link>
            ))}
          </div>

          <div className="flex items-start gap-10 pt-8">
            <div className="min-w-0 flex-1">{content}</div>

            <nav className="sticky top-10 w-52 shrink-0">
              {FACULTY_SECTION_OPTIONS.map((section) => (
                <Link
                  key={section}
                  href={buildHref(activeLevel, section)}
                  className={cn(
                    "block w-full border-l-2 py-3 pl-4 text-left text-sm transition-all duration-200",
                    activeSection === section
                      ? "border-[#004C97] font-semibold text-[#004C97]"
                      : "border-black/10 text-black/40 hover:border-black/25 hover:text-black/60",
                  )}
                >
                  {t(`sections.${section}`)}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </section>
    </main>
  );
};
