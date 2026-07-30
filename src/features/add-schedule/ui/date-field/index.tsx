import { type FieldErrors, type UseFormRegister } from "react-hook-form";

import { FormInput } from "@/shared/ui/form-input";

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
      <FormInput
        id="schedule-date"
        type="date"
        {...register("dateOfPublication")}
        hasError={!!errors.dateOfPublication?.message}
        aria-invalid={!!errors.dateOfPublication?.message}
        aria-describedby={errors.dateOfPublication?.message ? "schedule-date-error" : undefined}
      />

      {errors.dateOfPublication?.message ? (
        <p id="schedule-date-error" className="text-sm text-red-500 md:text-base">
          {errors.dateOfPublication.message}
        </p>
      ) : null}
    </div>
  </div>
);
