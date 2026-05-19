import { type FieldErrors, type UseFormRegister } from "react-hook-form";

import { cn } from "@/shared/helpers";

import { type AddDocumentFormValues } from "../../../types";

interface Props {
  errors: FieldErrors<AddDocumentFormValues>;
  register: UseFormRegister<AddDocumentFormValues>;
  t: (key: string) => string;
}

export const DocumentTitleField = ({ errors, register, t }: Props) => (
  <div className="space-y-3">
    <label
      htmlFor="document-title"
      className="text-xl font-medium tracking-tight text-black md:text-2xl"
    >
      {t("titleLabel")}
    </label>

    <div className="space-y-2">
      <input
        id="document-title"
        {...register("title")}
        placeholder={t("placeholders.title")}
        className={cn(
          "w-full rounded-[0.95rem] border border-black/10 bg-white px-4 py-3 text-base text-black outline-none transition-colors placeholder:text-black/35 focus:border-[#004C97]",
          errors.title?.message && "border-red-500 focus:border-red-500",
        )}
      />

      {errors.title?.message ? (
        <p className="text-sm text-red-500 md:text-base">{errors.title.message}</p>
      ) : null}
    </div>
  </div>
);
