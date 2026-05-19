import { type FieldErrors, type UseFormRegister } from "react-hook-form";

import { cn } from "@/shared/helpers";

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
      <select
        id="schedule-level"
        {...register("level")}
        className={cn(
          "w-full rounded-[0.95rem] border border-black/10 bg-white px-4 py-3 text-base text-black outline-none transition-colors focus:border-[#004C97]",
          errors.level?.message && "border-red-500 focus:border-red-500",
        )}
      >
        {levelOptions.map((level) => (
          <option key={level} value={level}>
            {t(`levels.${level}`)}
          </option>
        ))}
      </select>

      {errors.level?.message ? (
        <p className="text-sm text-red-500 md:text-base">{errors.level.message}</p>
      ) : null}
    </div>
  </div>
);
