import { type FieldErrors, type UseFormRegister } from "react-hook-form";

import { FormSelect } from "@/shared/ui/form-select";

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
      <FormSelect
        id="schedule-section"
        {...register("section")}
        hasError={!!errors.section?.message}
      >
        {sectionOptions.map((section) => (
          <option key={section} value={section}>
            {t(`sections.${section}`)}
          </option>
        ))}
      </FormSelect>

      {errors.section?.message ? (
        <p className="text-sm text-red-500 md:text-base">{errors.section.message}</p>
      ) : null}
    </div>
  </div>
);
