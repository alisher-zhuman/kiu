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
      />

      {errors.title?.message ? (
        <p className="text-sm text-red-500 md:text-base">{errors.title.message}</p>
      ) : null}
    </div>
  </div>
);
