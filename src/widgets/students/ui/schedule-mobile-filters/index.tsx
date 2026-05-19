import { useTranslations } from "next-intl";

import { SCHEDULE_LEVEL_OPTIONS, SCHEDULE_SECTION_OPTIONS } from "@/entities/schedules";

interface Props {
  activeLevel: string;
  activeSection: string;
  onLevelChange: (level: string) => void;
  onSectionChange: (section: string) => void;
}

export const ScheduleMobileFilters = ({
  activeLevel,
  activeSection,
  onLevelChange,
  onSectionChange,
}: Props) => {
  const t = useTranslations("StudentsSchedulePage");

  return (
    <div className="flex gap-3 md:hidden">
      <select
        value={activeLevel}
        onChange={(e) => onLevelChange(e.target.value)}
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
        onChange={(e) => onSectionChange(e.target.value)}
        className="flex-1 rounded-[0.95rem] border border-black/10 bg-white px-4 py-2.5 text-sm text-black outline-none transition-colors focus:border-[#004C97]"
      >
        {SCHEDULE_SECTION_OPTIONS.map((section) => (
          <option key={section} value={section}>
            {t(`sections.${section}`)}
          </option>
        ))}
      </select>
    </div>
  );
};
