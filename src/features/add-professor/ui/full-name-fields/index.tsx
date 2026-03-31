"use client";

import { type FieldErrors, type UseFormRegister } from "react-hook-form";

import { type AppLocale } from "@/i18n/routing";

import { cn } from "@/shared/helpers";

import { type AddProfessorFormValues } from "../../types";

interface Props {
  errors: FieldErrors<AddProfessorFormValues["fullName"]>;
  localeOptions: readonly AppLocale[];
  register: UseFormRegister<AddProfessorFormValues>;
  t: (key: string) => string;
}

export const FullNameFields = ({
  errors,
  localeOptions,
  register,
  t,
}: Props) => (
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

            <input
              id={`professor-full-name-${locale}`}
              {...register(fieldName)}
              className={cn(
                "w-full rounded-[0.95rem] border border-black/10 bg-white px-4 py-3 text-base text-black outline-none transition-colors placeholder:text-black/35 focus:border-[#004C97]",
                fieldError && "border-red-500 focus:border-red-500",
              )}
            />

            {fieldError ? (
              <p className="text-sm text-red-500 md:text-base">{fieldError}</p>
            ) : null}
          </div>
        );
      })}
    </div>
  </div>
);
