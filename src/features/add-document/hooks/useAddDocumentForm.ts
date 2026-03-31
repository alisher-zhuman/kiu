"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useLocale, useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "@/i18n/navigation";

import { createDocument } from "@/entities/documents";

import { QUERY_KEYS } from "@/shared/constants";
import { getApiErrorMessage } from "@/shared/helpers";
import { useToastMutation } from "@/shared/hooks";

import { DOCUMENT_TYPE_OPTIONS } from "../constants";
import { createAddDocumentFormSchema } from "../schemas";
import { type AddDocumentFormValues } from "../types";

import { useAddDocumentFile } from "./useAddDocumentFile";

export const useAddDocumentForm = () => {
  const locale = useLocale();
  const router = useRouter();

  const t = useTranslations("AdminDocumentsPage.addForm");

  const schema = useMemo(() => createAddDocumentFormSchema(t), [t]);

  const {
    clearErrors,
    formState: { errors, isSubmitting },
    getValues,
    handleSubmit,
    register,
    setError,
    setValue,
  } = useForm<AddDocumentFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      content: "",
      docType: DOCUMENT_TYPE_OPTIONS[0],
      title: "",
    },
    mode: "onChange",
  });

  const {
    fileInputRef,
    fileName,
    handleFileSelect,
    isFileDeletePending,
    isFileUploadDisabled,
    isSubmittingFile,
    openFileDialog,
    removeFile,
  } = useAddDocumentFile({
    clearErrors,
    getValues,
    setError,
    setValue,
    t,
  });

  const mutation = useToastMutation({
    mutationFn: (values: AddDocumentFormValues) => createDocument(values),
    invalidateKeys: [QUERY_KEYS.adminDocuments(locale)],
    pendingMessage: t("pending.submit"),
    successMessage: (data) => data.message || t("success"),
    errorMessage: (error: unknown) =>
      getApiErrorMessage(error, t("errors.submit")),
    onSuccess: () => {
      router.replace("/admin/documents");
    },
  });

  const onSubmit = handleSubmit((values) => {
    mutation.mutate(values);
  });

  return {
    errors,
    fileInputRef,
    fileName,
    handleFileSelect,
    isFileDeletePending,
    isFileUploadDisabled,
    isSubmitDisabled: isSubmittingFile || mutation.isPending || isSubmitting,
    documentTypeOptions: DOCUMENT_TYPE_OPTIONS,
    onSubmit,
    openFileDialog,
    register,
    removeFile,
    t,
  };
};
