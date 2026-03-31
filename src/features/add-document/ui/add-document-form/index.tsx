"use client";

import { cn } from "@/shared/helpers";

import { useAddDocumentForm } from "../../hooks/useAddDocumentForm";
import { FileFieldset } from "../file-fieldset";

export const AddDocumentForm = () => {
  const {
    errors,
    fileInputRef,
    fileName,
    handleFileSelect,
    isFileDeletePending,
    isFileUploadDisabled,
    isSubmitDisabled,
    documentTypeOptions,
    onSubmit,
    openFileDialog,
    register,
    removeFile,
    t,
  } = useAddDocumentForm();

  return (
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
            <p className="text-sm text-red-500 md:text-base">
              {errors.docType.message}
            </p>
          ) : null}
        </div>
      </div>

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
            className={cn(
              "w-full rounded-[0.95rem] border border-black/10 bg-white px-4 py-3 text-base text-black outline-none transition-colors placeholder:text-black/35 focus:border-[#004C97]",
              errors.title?.message && "border-red-500 focus:border-red-500",
            )}
          />

          {errors.title?.message ? (
            <p className="text-sm text-red-500 md:text-base">
              {errors.title.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex">
        <button
          type="submit"
          disabled={isSubmitDisabled}
          className={cn(
            "inline-flex cursor-pointer w-full items-center justify-center rounded-[0.95rem] bg-[#004C97] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#002E5C] md:ml-auto md:w-auto md:min-w-40 md:text-base",
            isSubmitDisabled &&
              "cursor-not-allowed opacity-55 hover:bg-[#004C97]",
          )}
        >
          {t("submit")}
        </button>
      </div>
    </form>
  );
};
