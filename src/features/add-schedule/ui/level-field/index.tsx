import { type FieldErrors, type UseFormRegister } from "react-hook-form";

import { FormSelect } from "@/shared/ui/form-select";

import { type AddScheduleFormValues } from "../../types";

interface Props {
  errors: FieldErrors<AddScheduleFormValues>;
  levelOptions: readonly string[];
  register: UseFormRegister<AddScheduleFormValues>;
  t: (key: string) => string;
}

export const LevelField = ({ errors, levelOptions, register, t }: Props) => (
  <div className="space-y-2">
    <label
      htmlFor="schedule-level"
      className="text-xl font-medium tracking-tight text-black md:text-2xl"
    >
      {t("levelLabel")}
    </label>

    <div className="space-y-2">
      <FormSelect
        id="schedule-level"
        {...register("level")}
        hasError={!!errors.level?.message}
      >
        {levelOptions.map((level) => (
          <option key={level} value={level}>
            {t(`levels.${level}`)}
          </option>
        ))}
      </FormSelect>

      {errors.level?.message ? (
        <p className="text-sm text-red-500 md:text-base">{errors.level.message}</p>
      ) : null}
    </div>
  </div>
);
