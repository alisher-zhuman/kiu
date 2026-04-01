"use client";

import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useLocale, useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";

import { useRouter } from "@/i18n/navigation";

import { DOCUMENT_TYPE_OPTIONS } from "@/features/add-document/constants";
import {
  createDefaultDocumentFormValues,
  mapDocumentFormValuesToPayload,
  mapDocumentItemToFormValues,
} from "@/features/add-document/helpers/base";
import { useAddDocumentFile } from "@/features/add-document/hooks/useAddDocumentFile";
import { createAddDocumentFormSchema } from "@/features/add-document/schemas";
import { type AddDocumentFormValues } from "@/features/add-document/types";

import { getDocumentById, updateDocument } from "@/entities/documents";

import { QUERY_KEYS } from "@/shared/constants";
import { getApiErrorMessage } from "@/shared/helpers";
import { useToastMutation } from "@/shared/hooks";

interface Params {
  id: number;
}

export const useEditDocumentForm = ({ id }: Params) => {
  const locale = useLocale();
  const router = useRouter();

  const fieldsT = useTranslations("AdminDocumentsPage.addForm");
  const editT = useTranslations("AdminDocumentsPage.editForm");

  const schema = useMemo(() => createAddDocumentFormSchema(fieldsT), [fieldsT]);

  const {
    clearErrors,
    control,
    formState: { errors, isSubmitting },
    getValues,
    handleSubmit,
    register,
    reset,
    setError,
    setValue,
  } = useForm<AddDocumentFormValues>({
    resolver: zodResolver(schema),
    defaultValues: createDefaultDocumentFormValues(),
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
    control,
    getValues,
    setError,
    setValue,
    t: fieldsT,
  });

  const {
    data: documentItem,
    error: documentError,
    isLoading: isDocumentLoading,
  } = useQuery({
    queryKey: QUERY_KEYS.adminDocumentById(locale, id),
    queryFn: () => getDocumentById(id),
  });

  useEffect(() => {
    if (!documentItem) {
      return;
    }

    reset(mapDocumentItemToFormValues(documentItem));
  }, [documentItem, reset]);

  const mutation = useToastMutation({
    mutationFn: (values: AddDocumentFormValues) =>
      updateDocument(id, mapDocumentFormValuesToPayload(values)),
    invalidateKeys: [
      QUERY_KEYS.adminDocumentById(locale, id),
      QUERY_KEYS.adminDocuments(locale),
    ],
    pendingMessage: editT("pending.submit"),
    successMessage: editT("success"),
    errorMessage: (error: unknown) =>
      getApiErrorMessage(error, editT("errors.submit")),
    onSuccess: () => {
      router.replace("/admin/documents");
    },
  });

  const onSubmit = handleSubmit((values) => {
    mutation.mutate(values);
  });

  return {
    documentError,
    documentItem,
    documentTypeOptions: DOCUMENT_TYPE_OPTIONS,
    editT,
    errors,
    fieldsT,
    fileInputRef,
    fileName,
    handleFileSelect,
    isDocumentLoading,
    isFileDeletePending,
    isFileUploadDisabled,
    isSubmitDisabled: isSubmittingFile || mutation.isPending || isSubmitting,
    onSubmit,
    openFileDialog,
    register,
    removeFile,
  };
};
