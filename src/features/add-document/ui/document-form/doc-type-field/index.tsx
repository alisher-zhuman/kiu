import { type FieldErrors, type UseFormRegister } from "react-hook-form";

import { type DocumentItem } from "@/entities/documents";

import { cn } from "@/shared/helpers";

import { type AddDocumentFormValues } from "../../../types";

interface Props {
  documentTypeOptions: readonly DocumentItem["docType"][];
  errors: FieldErrors<AddDocumentFormValues>;
  register: UseFormRegister<AddDocumentFormValues>;
  t: (key: string) => string;
}

export const DocTypeField = ({ documentTypeOptions, errors, register, t }: Props) => (
  <div className="space-y-3">
    <label
      htmlFor="document-doc-type"
      className="text-xl font-medium tracking-tight text-black md:text-2xl"
    >
      {t("docTypeLabel")}
    </label>

    <div className="space-y-2">
      <select
        id="document-doc-type"
        {...register("docType")}
        className={cn(
          "w-full rounded-[0.95rem] border border-black/10 bg-white px-4 py-3 text-base text-black outline-none transition-colors focus:border-[#004C97]",
          errors.docType?.message && "border-red-500 focus:border-red-500",
        )}
      >
        {documentTypeOptions.map((option) => (
          <option key={option} value={option}>
            {t(`docTypes.${option}`)}
          </option>
        ))}
      </select>

      {errors.docType?.message ? (
        <p className="text-sm text-red-500 md:text-base">{errors.docType.message}</p>
      ) : null}
    </div>
  </div>
);
