"use client";

import { useState } from "react";
import {
  type Control,
  type UseFormClearErrors,
  type UseFormGetValues,
  type UseFormSetError,
  type UseFormSetValue,
  useWatch,
} from "react-hook-form";

import { checkIsPdfFile, getFileNameFromUrl } from "@/shared/helpers";
import { useSingleFileFieldTransfer } from "@/shared/hooks";

import { MAX_DOCUMENT_FILE_SIZE_BYTES } from "../constants";
import { type AddDocumentFormValues } from "../types";

interface Params {
  clearErrors: UseFormClearErrors<AddDocumentFormValues>;
  control: Control<AddDocumentFormValues>;
  getValues: UseFormGetValues<AddDocumentFormValues>;
  setError: UseFormSetError<AddDocumentFormValues>;
  setValue: UseFormSetValue<AddDocumentFormValues>;
  t: (key: string) => string;
}

export const useAddDocumentFile = ({
  clearErrors,
  control,
  getValues,
  setError,
  setValue,
  t,
}: Params) => {
  const content = useWatch({
    control,
    defaultValue: "",
    name: "content",
  });

  const [fileName, setFileName] = useState(() => getFileNameFromUrl(content));
  const [prevContent, setPrevContent] = useState(content);

  if (content !== prevContent) {
    setPrevContent(content);
    setFileName(getFileNameFromUrl(content));
  }

  const {
    fileInputRef,
    handleFileSelect: handleSingleFileSelect,
    isDeletePending,
    isTransferDisabled,
    isTransferring,
    openFileDialog,
    removeFile,
  } = useSingleFileFieldTransfer({
    clearErrors,
    deleteErrorMessage: t("errors.file.delete"),
    deletePendingMessage: t("pending.delete"),
    fieldName: "content",
    getValues,
    setError,
    setValue,
    uploadErrorMessage: t("errors.file.upload"),
    uploadPendingMessage: t("pending.upload"),
    validateFile: (file) => {
      if (!checkIsPdfFile(file)) {
        return t("errors.file.invalidType");
      }

      if (file.size > MAX_DOCUMENT_FILE_SIZE_BYTES) {
        return t("errors.file.maxSize");
      }

      return null;
    },
  });

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = await handleSingleFileSelect(event);

    if (!file) {
      return;
    }

    setFileName(file.name);
  };

  const handleFileRemove = async () => {
    await removeFile();
    setFileName("");
  };

  return {
    fileInputRef,
    fileName,
    handleFileSelect,
    isFileDeletePending: isDeletePending,
    isFileUploadDisabled: isTransferDisabled,
    isSubmittingFile: isTransferring,
    openFileDialog,
    removeFile: handleFileRemove,
  };
};
