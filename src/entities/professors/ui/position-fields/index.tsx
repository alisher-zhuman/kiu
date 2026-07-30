"use client";

import { type FieldErrors, type UseFormRegister } from "react-hook-form";
import { Minus, Plus } from "lucide-react";

import { type AppLocale } from "@/i18n/routing";

import { FormInput } from "@/shared/ui/form-input";

import { type ProfessorFormValues, type ProfessorPositionFormValue } from "../../model/types";

interface Props {
  addPosition: () => void;
  errors: FieldErrors<ProfessorFormValues>["positions"];
  localeOptions: readonly AppLocale[];
  positionFields: Array<{ id: string }>;
  register: UseFormRegister<ProfessorFormValues>;
  removePosition: (index: number) => void;
  t: (key: string) => string;
}

export const PositionFields = ({
  addPosition,
  errors,
  localeOptions,
  positionFields,
  register,
  removePosition,
  t,
}: Props) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between gap-3">
      <h2 className="text-xl font-medium tracking-tight text-black md:text-2xl">
        {t("positionLabel")}
      </h2>

      <button
        type="button"
        onClick={addPosition}
        className="inline-flex cursor-pointer items-center gap-1.5 rounded-[0.95rem] bg-black/6 px-3 py-2 text-sm font-medium text-black transition-colors hover:bg-black/8"
      >
        <Plus className="size-4" />
        {t("addPosition")}
      </button>
    </div>

    <div className="space-y-4">
      {positionFields.map((field, index) => (
        <div key={field.id} className="space-y-4 rounded-2xl border border-black/10 p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-black/55">
              {t("positionItem")} {index + 1}
            </p>

            {positionFields.length > 1 ? (
              <button
                type="button"
                onClick={() => removePosition(index)}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-[0.85rem] bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
              >
                <Minus className="size-4" />
                {t("removePosition")}
              </button>
            ) : null}
          </div>

          <div className="space-y-4">
            {localeOptions.map((locale) => {
              const fieldError = (
                errors?.[index] as FieldErrors<ProfessorPositionFormValue> | undefined
              )?.[locale]?.message;
              const errorId = `professor-position-${field.id}-${locale}-error`;

              return (
                <div key={`${field.id}-${locale}`} className="space-y-2">
                  <label
                    htmlFor={`professor-position-${field.id}-${locale}`}
                    className="text-base font-medium text-black/70"
                  >
                    {t(`locales.${locale}`)}
                  </label>

                  <FormInput
                    id={`professor-position-${field.id}-${locale}`}
                    {...register(`positions.${index}.${locale}`)}
                    placeholder={t(`placeholders.position.${locale}`)}
                    hasError={!!fieldError}
                    aria-invalid={!!fieldError}
                    aria-describedby={fieldError ? errorId : undefined}
                  />

                  {fieldError ? (
                    <p id={errorId} className="text-sm text-red-500 md:text-base">
                      {fieldError}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  </div>
);
