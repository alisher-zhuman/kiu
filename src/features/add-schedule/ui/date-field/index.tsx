import { type FieldErrors, type UseFormRegister } from "react-hook-form";

import { cn } from "@/shared/helpers";

import { type AddScheduleFormValues } from "../../types";

interface Props {
  errors: FieldErrors<AddScheduleFormValues>;
  register: UseFormRegister<AddScheduleFormValues>;
  t: (key: string) => string;
}

export const DateField = ({ errors, register, t }: Props) => (
  <div className="space-y-2">
    <label
      htmlFor="schedule-date"
      className="text-xl font-medium tracking-tight text-black md:text-2xl"
    >
      {t("dateLabel")}
    </label>

    <div className="space-y-2">
      <input
        id="schedule-date"
        type="date"
        {...register("dateOfPublication")}
        className={cn(
          "w-full rounded-[0.95rem] border border-black/10 bg-white px-4 py-3 text-base text-black outline-none transition-colors focus:border-[#004C97]",
          errors.dateOfPublication?.message &&
            "border-red-500 focus:border-red-500",
        )}
      />

      {errors.dateOfPublication?.message ? (
        <p className="text-sm text-red-500 md:text-base">
          {errors.dateOfPublication.message}
        </p>
      ) : null}
    </div>
  </div>
);
