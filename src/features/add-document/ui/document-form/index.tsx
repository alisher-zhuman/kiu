"use client";

import { type ChangeEvent,type FormEventHandler, type RefObject } from "react";
import { type FieldErrors, type UseFormRegister } from "react-hook-form";

import { type DocumentItem } from "@/entities/documents";

import { cn } from "@/shared/helpers";

import { type AddDocumentFormValues } from "../../types";
import { DocTypeField } from "../doc-type-field";
import { DocumentTitleField } from "../document-title-field";
import { FileFieldset } from "../file-fieldset";

interface Props {
  documentTypeOptions: readonly DocumentItem["docType"][];
  errors: FieldErrors<AddDocumentFormValues>;
  fileInputRef: RefObject<HTMLInputElement | null>;
  fileName: string;
  handleFileSelect: (event: ChangeEvent<HTMLInputElement>) => void;
  isFileDeletePending: boolean;
  isFileUploadDisabled: boolean;
  isSubmitDisabled: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
  openFileDialog: () => void;
  register: UseFormRegister<AddDocumentFormValues>;
  removeFile: () => Promise<void>;
  submitLabel: string;
  t: (key: string) => string;
}

export const DocumentForm = ({
  documentTypeOptions,
  errors,
  fileInputRef,
  fileName,
  handleFileSelect,
  isFileDeletePending,
  isFileUploadDisabled,
  isSubmitDisabled,
  onSubmit,
  openFileDialog,
  register,
  removeFile,
  submitLabel,
  t,
}: Props) => (
  <form
    className="mx-auto w-full space-y-6 md:max-w-3xl"
    noValidate
    onSubmit={onSubmit}
  >
    <FileFieldset
      errorMessage={errors.content?.message}
      fileInputRef={fileInputRef}
      fileName={fileName}
      handleFileSelect={handleFileSelect}
      isDeletePending={isFileDeletePending}
      isUploadDisabled={isFileUploadDisabled}
      openFileDialog={openFileDialog}
      removeFile={removeFile}
      t={t}
    />

    <DocTypeField
      documentTypeOptions={documentTypeOptions}
      errors={errors}
      register={register}
      t={t}
    />

    <DocumentTitleField errors={errors} register={register} t={t} />

    <div className="flex">
      <button
        type="submit"
        disabled={isSubmitDisabled}
        className={cn(
          "inline-flex w-full cursor-pointer items-center justify-center rounded-[0.95rem] bg-[#004C97] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#002E5C] md:ml-auto md:w-auto md:min-w-40 md:text-base",
          isSubmitDisabled && "cursor-not-allowed opacity-55 hover:bg-[#004C97]",
        )}
      >
        {submitLabel}
      </button>
    </div>
  </form>
);
