"use client";

import { useTranslations } from "next-intl";
import { ExternalLink, FileText } from "lucide-react";

import { Link, usePathname, useRouter } from "@/i18n/navigation";

import {
  SCHEDULE_LEVEL_OPTIONS,
  SCHEDULE_SECTION_OPTIONS,
  type ScheduleItem,
} from "@/entities/schedules";

import { cn } from "@/shared/helpers";

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

  const handleLevelChange = (level: string) =>
    router.push(buildHref(level, activeSection));

  const handleSectionChange = (section: string) =>
    router.push(buildHref(activeLevel, section));

  const emptyState = (
    <div className="rounded-3xl border border-black/10 bg-white px-5 py-10 text-center text-base text-black/60 shadow-[0_14px_32px_rgba(0,0,0,0.04)] md:px-6 md:py-12">
      {t("empty")}
    </div>
  );

  const errorState = (
    <div className="rounded-3xl border border-red-200 bg-red-50 px-5 py-4 text-base text-red-600 md:px-6 md:py-5">
      {t("error")}
    </div>
  );

  const grid = (
    <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
      {schedules.map((item) => (
        <article
          key={item.id}
          className="flex flex-col rounded-2xl border border-black/10 bg-white p-4 shadow-[0_10px_24px_rgba(0,0,0,0.035)] md:p-5"
        >
          <div className="flex items-start gap-3">
            <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#004C97]/8 text-[#004C97]">
              <FileText className="size-5" />
            </span>

            <div className="min-w-0 space-y-1">
              <h2 className="text-base font-semibold tracking-tight text-black md:text-lg">
                {item.title}
              </h2>
              <p className="text-xs text-black/45">{item.dateOfPublication}</p>
            </div>
          </div>

          <div className="mt-auto pt-4">
            <a
              href={item.content}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#004C97] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#002E5C]"
            >
              <ExternalLink className="size-4" />
              {t("open")}
            </a>
          </div>
        </article>
      ))}
    </div>
  );

  const content = error ? errorState : schedules.length ? grid : emptyState;

  return (
    <main className="mx-auto max-w-400 px-5 py-10 text-black md:px-10 md:py-16">
      <section aria-labelledby="schedule-title" className="space-y-8 md:space-y-10">
        <div className="border-l-2 border-black pl-3 md:pl-4">
          <h1
            id="schedule-title"
            className="text-2xl font-bold tracking-tight sm:text-3xl md:text-5xl"
          >
            {title}
          </h1>
        </div>

        {/* Mobile: два селекта */}
        <div className="flex gap-3 md:hidden">
          <select
            value={activeLevel}
            onChange={(e) => handleLevelChange(e.target.value)}
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
            onChange={(e) => handleSectionChange(e.target.value)}
            className="flex-1 rounded-[0.95rem] border border-black/10 bg-white px-4 py-2.5 text-sm text-black outline-none transition-colors focus:border-[#004C97]"
          >
            {SCHEDULE_SECTION_OPTIONS.map((section) => (
              <option key={section} value={section}>
                {t(`sections.${section}`)}
              </option>
            ))}
          </select>
        </div>

        {/* Mobile: контент */}
        <div className="md:hidden">{content}</div>

        {/* Desktop: border-b-2 табы уровней + контент + сайдбар секций */}
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
              {SCHEDULE_SECTION_OPTIONS.map((section) => (
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
