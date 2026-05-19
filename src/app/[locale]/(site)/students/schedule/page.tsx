import { getTranslations } from "next-intl/server";

import { type AppLocale } from "@/i18n/routing";

import { StudentsSchedule } from "@/widgets/students";

import {
  type ScheduleItem,
  SCHEDULE_LEVEL_OPTIONS,
  SCHEDULE_SECTION_OPTIONS,
} from "@/entities/schedules";
import { getPublicSchedulesByLevel } from "@/entities/schedules/api/server";

interface Props {
  params: Promise<{ locale: AppLocale }>;
  searchParams: Promise<{ level?: string; section?: string }>;
}

const StudentsSchedulePage = async ({ params, searchParams }: Props) => {
  const { locale } = await params;
  const { level, section } = await searchParams;

  const activeLevel = SCHEDULE_LEVEL_OPTIONS.includes(
    level as (typeof SCHEDULE_LEVEL_OPTIONS)[number],
  )
    ? level!
    : SCHEDULE_LEVEL_OPTIONS[0];

  const activeSection = SCHEDULE_SECTION_OPTIONS.includes(
    section as (typeof SCHEDULE_SECTION_OPTIONS)[number],
  )
    ? section!
    : SCHEDULE_SECTION_OPTIONS[0];

  const t = await getTranslations({ locale, namespace: "Navbar" });

  let hasError = false;
  let schedules: ScheduleItem[] = [];

  try {
    schedules = await getPublicSchedulesByLevel(locale, activeLevel, activeSection);
  } catch {
    hasError = true;
  }

  return (
    <StudentsSchedule
      activeLevel={activeLevel}
      activeSection={activeSection}
      error={hasError}
      schedules={schedules}
      title={t("students.links.schedule")}
    />
  );
};

export default StudentsSchedulePage;
