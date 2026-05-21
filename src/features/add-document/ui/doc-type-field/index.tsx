import { type FieldErrors, type UseFormRegister } from "react-hook-form";

import { type DocumentItem } from "@/entities/documents";

import { FormSelect } from "@/shared/ui/form-select";

import { type AddDocumentFormValues } from "../../types";

interface Props {
  documentTypeOptions: readonly DocumentItem["docType"][];
  errors: FieldErrors<AddDocumentFormValues>;
  register: UseFormRegister<AddDocumentFormValues>;
  t: (key: string) => string;
}

export const DocTypeField = ({ documentTypeOptions, errors, register, t }: Props) => (
  <div className="space-y-2">
    <label
      htmlFor="document-doc-type"
      className="text-xl font-medium tracking-tight text-black md:text-2xl"
    >
      {t("docTypeLabel")}
    </label>

    <div className="space-y-2">
      <FormSelect
        id="document-doc-type"
        {...register("docType")}
        hasError={!!errors.docType?.message}
      >
        {documentTypeOptions.map((option) => (
          <option key={option} value={option}>
            {t(`docTypes.${option}`)}
          </option>
        ))}
      </FormSelect>

      {errors.docType?.message ? (
        <p className="text-sm text-red-500 md:text-base">{errors.docType.message}</p>
      ) : null}
    </div>
  </div>
);
