"use client";

import { useEffect, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLocale, useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";

import { useRouter } from "@/i18n/navigation";

import { LOCALE_OPTIONS, QUERY_KEYS } from "@/shared/constants";
import { getApiErrorMessage } from "@/shared/helpers";
import { useToastMutation } from "@/shared/hooks";

import { createNews, getNewsByIdForEdit, updateNews } from "../api";
import {
  createDefaultNewsFormValues,
  mapEditableNewsToFormValues,
  mapNewsFormValuesToPayload,
} from "../model/helpers";
import { createNewsFormSchema } from "../model/schemas";
import { type EditableNews, type NewsFormValues } from "../model/types";

import { useNewsImages } from "./useNewsImages";

interface BaseParams {
  mode: "add" | "edit";
}

interface EditParams extends BaseParams {
  id: number;
  mode: "edit";
}

type Params = BaseParams | EditParams;

export const useNewsForm = (params: Params) => {
  const locale = useLocale();
  const router = useRouter();

  const fieldsT = useTranslations("AdminNewsPage.addForm");
  const editT = useTranslations("AdminNewsPage.editForm");

  const isEditMode = params.mode === "edit";
  const submitT = isEditMode ? editT : fieldsT;

  const schema = useMemo(() => createNewsFormSchema(fieldsT), [fieldsT]);

  const {
    clearErrors,
    control,
    formState: { errors, isSubmitting, isDirty },
    getValues,
    handleSubmit,
    register,
    reset,
    setError,
    setValue,
  } = useForm<NewsFormValues>({
    resolver: zodResolver(schema),
    defaultValues: createDefaultNewsFormValues(),
    mode: "onChange",
  });

  const images = useWatch({
    control,
    defaultValue: [],
    name: "images",
  });

  const {
    fileInputRef,
    handleFilesSelect,
    isDeletePending,
    isUploadDisabled,
    isUploadingImages,
    openFileDialog,
    removeImage,
  } = useNewsImages({
    clearErrors,
    getValues,
    images,
    setError,
    setValue,
    t: fieldsT,
  });

  const {
    data: news,
    error: newsError,
    isLoading: isNewsLoading,
  } = useQuery({
    queryKey:
      isEditMode && "id" in params
        ? QUERY_KEYS.adminNewsFormById(locale, params.id)
        : ["admin-news-form-idle", locale],
    queryFn: () => getNewsByIdForEdit((params as EditParams).id),
    enabled: isEditMode,
  });

  useEffect(() => {
    if (!news) {
      return;
    }

    reset(mapEditableNewsToFormValues(news));
  }, [news, reset]);

  const mutation = useToastMutation({
    mutationFn: (values: NewsFormValues) => {
      const payload = mapNewsFormValuesToPayload(values);

      if (isEditMode && "id" in params) {
        return updateNews(params.id, payload);
      }

      return createNews(payload);
    },
    invalidateKeys:
      isEditMode && "id" in params
        ? [
            QUERY_KEYS.adminNews(locale),
            QUERY_KEYS.adminNewsById(locale, params.id),
            QUERY_KEYS.adminNewsFormById(locale, params.id),
          ]
        : [QUERY_KEYS.adminNews(locale)],
    pendingMessage: submitT("pending.submit"),
    successMessage: submitT("success"),
    errorMessage: (error: unknown) =>
      getApiErrorMessage(error, submitT("errors.submit")),
    onSuccess: () => {
      if (isEditMode) {
        router.back();
      } else {
        router.replace("/admin/news");
      }
    },
  });

  const onSubmit = handleSubmit((values) => {
    mutation.mutate(values);
  });

  return {
    editT,
    errors,
    fileInputRef,
    handleFilesSelect,
    images,
    isDeletePending,
    isNewsLoading,
    isSubmitDisabled:
      isUploadingImages ||
      mutation.isPending ||
      isSubmitting ||
      (isEditMode && !isDirty),
    isUploadDisabled,
    localeOptions: LOCALE_OPTIONS,
    news: (news ?? null) as EditableNews | null,
    newsError,
    onSubmit,
    openFileDialog,
    removeImage,
    register,
    t: fieldsT,
  };
};
