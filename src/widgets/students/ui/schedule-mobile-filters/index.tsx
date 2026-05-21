import { useTranslations } from "next-intl";

import { SCHEDULE_LEVEL_OPTIONS } from "@/entities/schedules";

import { FACULTY_SECTION_OPTIONS } from "@/shared/constants";
import { FilterSelect } from "@/shared/ui/filter-select";

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
      <FilterSelect
        value={activeLevel}
        onChange={(e) => onLevelChange(e.target.value)}
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
        onChange={(e) => onSectionChange(e.target.value)}
        className="flex-1"
      >
        {FACULTY_SECTION_OPTIONS.map((section) => (
          <option key={section} value={section}>
            {t(`sections.${section}`)}
          </option>
        ))}
      </FilterSelect>
    </div>
  );
};
