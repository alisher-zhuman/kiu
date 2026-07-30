"use client";

import { type FieldErrors, type UseFormRegister } from "react-hook-form";

import { type AppLocale } from "@/i18n/routing";

import { FormInput } from "@/shared/ui/form-input";

import { type ProfessorFormValues } from "../../model/types";

interface Props {
  errors: FieldErrors<ProfessorFormValues["fullName"]>;
  localeOptions: readonly AppLocale[];
  register: UseFormRegister<ProfessorFormValues>;
  t: (key: string) => string;
}

export const FullNameFields = ({ errors, localeOptions, register, t }: Props) => (
  <div className="space-y-4">
    <h2 className="text-xl font-medium tracking-tight text-black md:text-2xl">
      {t("fullNameTitle")}
    </h2>

    <div className="space-y-4">
      {localeOptions.map((locale) => {
        const fieldName = `fullName.${locale}` as const;
        const fieldError = errors?.[locale]?.message;

        return (
          <div key={locale} className="space-y-2">
            <label
              htmlFor={`professor-full-name-${locale}`}
              className="text-base font-medium text-black/70"
            >
              {t(`locales.${locale}`)}
            </label>

            <FormInput
              id={`professor-full-name-${locale}`}
              {...register(fieldName)}
              placeholder={t(`placeholders.fullName.${locale}`)}
              hasError={!!fieldError}
            />

            {fieldError ? <p className="text-sm text-red-500 md:text-base">{fieldError}</p> : null}
          </div>
        );
      })}
    </div>
  </div>
);
