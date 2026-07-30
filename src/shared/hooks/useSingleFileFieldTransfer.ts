"use client";

import { type ChangeEvent, useRef } from "react";
import {
  type FieldPath,
  type FieldValues,
  type UseFormClearErrors,
  type UseFormGetValues,
  type UseFormSetError,
  type UseFormSetValue,
} from "react-hook-form";

import { DIRTY_FORM_VALUE_OPTIONS } from "@/shared/constants/form";

import { useFileTransfer } from "./useFileTransfer";

interface Params<TFieldValues extends FieldValues, TFieldName extends FieldPath<TFieldValues>> {
  clearErrors: UseFormClearErrors<TFieldValues>;
  deleteErrorMessage: string;
  deletePendingMessage: string;
  fieldName: TFieldName;
  getValues: UseFormGetValues<TFieldValues>;
  setError: UseFormSetError<TFieldValues>;
  setValue: UseFormSetValue<TFieldValues>;
  uploadErrorMessage: string;
  uploadPendingMessage: string;
  validateFile: (file: File) => string | null;
}

export const useSingleFileFieldTransfer = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
>({
  clearErrors,
  deleteErrorMessage,
  deletePendingMessage,
  fieldName,
  getValues,
  setError,
  setValue,
  uploadErrorMessage,
  uploadPendingMessage,
  validateFile,
}: Params<TFieldValues, TFieldName>) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const fileTransfer = useFileTransfer({
    deleteErrorMessage,
    deletePendingMessage,
    uploadErrorMessage,
    uploadPendingMessage,
  });

  const setFieldValue = (value: string) => {
    setValue(fieldName, value as TFieldValues[TFieldName], DIRTY_FORM_VALUE_OPTIONS);
  };

  const openFileDialog = () => {
    if (getValues(fieldName) || fileTransfer.isUploadPending) {
      return;
    }

    fileInputRef.current?.click();
  };

  const handleFileSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    event.target.value = "";

    if (!file) {
      return null;
    }

    const validationError = validateFile(file);

    if (validationError) {
      setError(fieldName, {
        message: validationError,
        type: "manual",
      });

      return null;
    }

    clearErrors(fieldName);

    const { url } = await fileTransfer.uploadFile(file);

    setFieldValue(url);

    return file;
  };

  const removeFile = async () => {
    const fileUrl = getValues(fieldName);

    if (!fileUrl) {
      return;
    }

    await fileTransfer.deleteFile(fileUrl as string);
    setFieldValue("");
  };

  return {
    fileInputRef,
    handleFileSelect,
    isDeletePending: fileTransfer.isDeletePending,
    isTransferDisabled: Boolean(getValues(fieldName)) || fileTransfer.isUploadPending,
    isTransferring: fileTransfer.isTransferring,
    openFileDialog,
    removeFile,
  };
};
