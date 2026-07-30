"use client";

import { type FieldErrors, type UseFormRegister } from "react-hook-form";

import { type AppLocale } from "@/i18n/routing";

import { cn } from "@/shared/helpers";

import { type NewsFormValues } from "../../model/types";

interface Props {
  errors: FieldErrors<NewsFormValues>["title"];
  localeOptions: readonly AppLocale[];
  register: UseFormRegister<NewsFormValues>;
  t: (key: string) => string;
}

export const TitleFields = ({ errors, localeOptions, register, t }: Props) => (
  <div className="space-y-3">
    <h2 className="text-xl font-medium tracking-tight text-black md:text-2xl">
      {t("titleSectionTitle")}
    </h2>

    <div className="space-y-3">
      {localeOptions.map((locale) => (
        <div key={`title-${locale}`} className="space-y-2">
          <label htmlFor={`title-${locale}`} className="text-sm font-medium text-black/65">
            {t(`locales.${locale}`)}
          </label>

          <input
            id={`title-${locale}`}
            type="text"
            {...register(`title.${locale}`)}
            placeholder={t(`placeholders.title.${locale}`)}
            className={cn(
              "w-full rounded-[0.95rem] border border-black/12 px-4 py-3 text-sm text-black outline-none transition-colors placeholder:text-black/30 focus:border-[#004C97] md:text-base",
              errors?.[locale] && "border-red-500 focus:border-red-500"
            )}
          />

          {errors?.[locale]?.message ? (
            <p className="text-sm text-red-500">{errors[locale]?.message}</p>
          ) : null}
        </div>
      ))}
    </div>
  </div>
);
