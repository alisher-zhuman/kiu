import { type FieldErrors, type UseFormRegister } from "react-hook-form";

import { FormInput } from "@/shared/ui/form-input";

import { type AddDocumentFormValues } from "../../types";

interface Props {
  errors: FieldErrors<AddDocumentFormValues>;
  register: UseFormRegister<AddDocumentFormValues>;
  t: (key: string) => string;
}

export const DocumentTitleField = ({ errors, register, t }: Props) => (
  <div className="space-y-2">
    <label
      htmlFor="document-title"
      className="text-xl font-medium tracking-tight text-black md:text-2xl"
    >
      {t("titleLabel")}
    </label>

    <div className="space-y-2">
      <FormInput
        id="document-title"
        {...register("title")}
        placeholder={t("placeholders.title")}
        hasError={!!errors.title?.message}
        aria-invalid={!!errors.title?.message}
        aria-describedby={errors.title?.message ? "document-title-error" : undefined}
      />

      {errors.title?.message ? (
        <p id="document-title-error" className="text-sm text-red-500 md:text-base">
          {errors.title.message}
        </p>
      ) : null}
    </div>
  </div>
);
