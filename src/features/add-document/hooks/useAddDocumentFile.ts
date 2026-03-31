"use client";

import { type ChangeEvent, useRef, useState } from "react";
import {
  type UseFormClearErrors,
  type UseFormGetValues,
  type UseFormSetError,
  type UseFormSetValue,
} from "react-hook-form";

import { deleteFile, uploadFile } from "@/entities/files";

import { getApiErrorMessage } from "@/shared/helpers";
import { useToastMutation } from "@/shared/hooks";

import { MAX_DOCUMENT_FILE_SIZE_BYTES } from "../schemas";
import { type AddDocumentFormValues } from "../types";

interface Params {
  clearErrors: UseFormClearErrors<AddDocumentFormValues>;
  getValues: UseFormGetValues<AddDocumentFormValues>;
  setError: UseFormSetError<AddDocumentFormValues>;
  setValue: UseFormSetValue<AddDocumentFormValues>;
  t: (key: string) => string;
}

const checkIsPdfFile = (file: File) => {
  return (
    file.type === "application/pdf" ||
    file.name.toLowerCase().endsWith(".pdf")
  );
};

export const useAddDocumentFile = ({
  clearErrors,
  getValues,
  setError,
  setValue,
  t,
}: Params) => {
  const [fileName, setFileName] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const uploadMutation = useToastMutation({
    mutationFn: (file: File) => uploadFile(file),
    pendingMessage: t("pending.upload"),
    errorMessage: (error: unknown) =>
      getApiErrorMessage(error, t("errors.file.upload")),
  });

  const deleteMutation = useToastMutation({
    mutationFn: (fileUrl: string) => deleteFile(fileUrl),
    pendingMessage: t("pending.delete"),
    errorMessage: (error: unknown) =>
      getApiErrorMessage(error, t("errors.file.delete")),
  });

  const setContentValue = (content: string) => {
    setValue("content", content, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const openFileDialog = () => {
    if (getValues("content") || uploadMutation.isPending) {
      return;
    }

    fileInputRef.current?.click();
  };

  const handleFileSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    event.target.value = "";

    if (!file) {
      return;
    }

    if (!checkIsPdfFile(file)) {
      setError("content", {
        message: t("errors.file.invalidType"),
        type: "manual",
      });

      return;
    }

    if (file.size > MAX_DOCUMENT_FILE_SIZE_BYTES) {
      setError("content", {
        message: t("errors.file.maxSize"),
        type: "manual",
      });

      return;
    }

    clearErrors("content");

    const { url } = await uploadMutation.mutateAsync(file);

    setContentValue(url);
    setFileName(file.name);
  };

  const removeFile = async () => {
    const fileUrl = getValues("content");

    if (!fileUrl) {
      return;
    }

    await deleteMutation.mutateAsync(fileUrl);

    setContentValue("");
    setFileName("");
  };

  return {
    fileInputRef,
    fileName,
    handleFileSelect,
    isFileDeletePending: deleteMutation.isPending,
    isFileUploadDisabled: Boolean(getValues("content")) || uploadMutation.isPending,
    isSubmittingFile: uploadMutation.isPending || deleteMutation.isPending,
    openFileDialog,
    removeFile,
  };
};
