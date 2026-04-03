"use client";

import { type ChangeEvent, useEffect, useRef, useState } from "react";
import {
  type Control,
  type UseFormClearErrors,
  type UseFormGetValues,
  type UseFormSetError,
  type UseFormSetValue,
  useWatch,
} from "react-hook-form";

import { DIRTY_FORM_VALUE_OPTIONS } from "@/shared/constants/form";
import { getFileNameFromUrl } from "@/shared/helpers";
import { useFileTransfer } from "@/shared/hooks/useFileTransfer";

import { MAX_DOCUMENT_FILE_SIZE_BYTES } from "../constants";
import { checkIsPdfFile } from "../helpers/base";
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
  const [fileName, setFileName] = useState("");

  const content = useWatch({
    control,
    defaultValue: "",
    name: "content",
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setFileName(getFileNameFromUrl(content));
  }, [content]);

  const fileTransfer = useFileTransfer({
    deleteErrorMessage: t("errors.file.delete"),
    deletePendingMessage: t("pending.delete"),
    uploadErrorMessage: t("errors.file.upload"),
    uploadPendingMessage: t("pending.upload"),
  });

  const setContentValue = (content: string) => {
    setValue("content", content, DIRTY_FORM_VALUE_OPTIONS);
  };

  const openFileDialog = () => {
    if (getValues("content") || fileTransfer.isUploadPending) {
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

    const { url } = await fileTransfer.uploadFile(file);

    setContentValue(url);
    setFileName(file.name);
  };

  const removeFile = async () => {
    const fileUrl = getValues("content");

    if (!fileUrl) {
      return;
    }

    await fileTransfer.deleteFile(fileUrl);

    setContentValue("");
    setFileName("");
  };

  return {
    fileInputRef,
    fileName,
    handleFileSelect,
    isFileDeletePending: fileTransfer.isDeletePending,
    isFileUploadDisabled:
      Boolean(getValues("content")) || fileTransfer.isUploadPending,
    isSubmittingFile: fileTransfer.isTransferring,
    openFileDialog,
    removeFile,
  };
};
