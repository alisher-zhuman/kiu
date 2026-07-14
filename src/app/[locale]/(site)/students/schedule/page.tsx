import { getTranslations, setRequestLocale } from "next-intl/server";

import { type AppLocale } from "@/i18n/routing";

import { StudentsSchedule } from "@/widgets/students";

import {
  SCHEDULE_LEVEL_OPTIONS,
  type ScheduleItem,
} from "@/entities/schedules";
import { getPublicSchedulesByLevel } from "@/entities/schedules/api/server";

import { FACULTY_SECTION_OPTIONS } from "@/shared/constants";
import { fetchSafely } from "@/shared/helpers";

interface Props {
  params: Promise<{ locale: AppLocale }>;
  searchParams: Promise<{ level?: string; section?: string }>;
}

const StudentsSchedulePage = async ({ params, searchParams }: Props) => {
  const { locale } = await params;
  const { level, section } = await searchParams;

  setRequestLocale(locale);

  const activeLevel = SCHEDULE_LEVEL_OPTIONS.includes(
    level as (typeof SCHEDULE_LEVEL_OPTIONS)[number],
  )
    ? level!
    : SCHEDULE_LEVEL_OPTIONS[0];

  const activeSection = FACULTY_SECTION_OPTIONS.includes(
    section as (typeof FACULTY_SECTION_OPTIONS)[number],
  )
    ? section!
    : FACULTY_SECTION_OPTIONS[0];

  const t = await getTranslations({ locale, namespace: "Navbar" });

  const { data: schedules, hasError } = await fetchSafely<ScheduleItem[]>(
    () => getPublicSchedulesByLevel(locale, activeLevel, activeSection),
    [],
  );

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
