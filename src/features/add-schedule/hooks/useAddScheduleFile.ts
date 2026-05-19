"use client";

import { useEffect, useState } from "react";
import {
  type Control,
  type UseFormClearErrors,
  type UseFormGetValues,
  type UseFormSetError,
  type UseFormSetValue,
  useWatch,
} from "react-hook-form";

import { getFileNameFromUrl } from "@/shared/helpers";
import { useSingleFileFieldTransfer } from "@/shared/hooks";

import { MAX_SCHEDULE_FILE_SIZE_BYTES } from "../constants";
import { checkIsPdfFile } from "../helpers/base";
import { type AddScheduleFormValues } from "../types";

interface Params {
  clearErrors: UseFormClearErrors<AddScheduleFormValues>;
  control: Control<AddScheduleFormValues>;
  getValues: UseFormGetValues<AddScheduleFormValues>;
  setError: UseFormSetError<AddScheduleFormValues>;
  setValue: UseFormSetValue<AddScheduleFormValues>;
  t: (key: string) => string;
}

export const useAddScheduleFile = ({
  clearErrors,
  control,
  getValues,
  setError,
  setValue,
  t,
}: Params) => {
  const [fileName, setFileName] = useState("");

  const content = useWatch({ control, defaultValue: "", name: "content" });

  useEffect(() => {
    setFileName(getFileNameFromUrl(content));
  }, [content]);

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
      if (!checkIsPdfFile(file)) return t("errors.file.invalidType");
      if (file.size > MAX_SCHEDULE_FILE_SIZE_BYTES) return t("errors.file.maxSize");
      return null;
    },
  });

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = await handleSingleFileSelect(event);
    if (!file) return;
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
