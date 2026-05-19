import { type FieldErrors, type UseFormRegister } from "react-hook-form";

import { cn } from "@/shared/helpers";

import { type AddScheduleFormValues } from "../../types";

interface Props {
  errors: FieldErrors<AddScheduleFormValues>;
  register: UseFormRegister<AddScheduleFormValues>;
  sectionOptions: readonly string[];
  t: (key: string) => string;
}

export const SectionField = ({ errors, register, sectionOptions, t }: Props) => (
  <div className="space-y-2">
    <label
      htmlFor="schedule-section"
      className="text-xl font-medium tracking-tight text-black md:text-2xl"
    >
      {t("sectionLabel")}
    </label>

    <div className="space-y-2">
      <select
        id="schedule-section"
        {...register("section")}
        className={cn(
          "w-full rounded-[0.95rem] border border-black/10 bg-white px-4 py-3 text-base text-black outline-none transition-colors focus:border-[#004C97]",
          errors.section?.message && "border-red-500 focus:border-red-500",
        )}
      >
        {sectionOptions.map((section) => (
          <option key={section} value={section}>
            {t(`sections.${section}`)}
          </option>
        ))}
      </select>

      {errors.section?.message ? (
        <p className="text-sm text-red-500 md:text-base">{errors.section.message}</p>
      ) : null}
    </div>
  </div>
);
