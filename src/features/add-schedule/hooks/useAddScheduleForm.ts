"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "@/i18n/navigation";

import {
  createSchedule,
  SCHEDULE_LEVEL_OPTIONS,
  SCHEDULE_SECTION_OPTIONS,
} from "@/entities/schedules";

import { QUERY_KEYS } from "@/shared/constants";
import { getApiErrorMessage } from "@/shared/helpers";
import { useToastMutation } from "@/shared/hooks";

import {
  createDefaultScheduleFormValues,
  mapScheduleFormValuesToPayload,
} from "../helpers/base";
import { createAddScheduleFormSchema } from "../schemas";
import { type AddScheduleFormValues } from "../types";

import { useAddScheduleFile } from "./useAddScheduleFile";

export const useAddScheduleForm = () => {
  const router = useRouter();

  const t = useTranslations("AdminSchedulesPage.addForm");

  const schema = useMemo(() => createAddScheduleFormSchema(t), [t]);

  const {
    clearErrors,
    control,
    formState: { errors, isSubmitting, isDirty },
    getValues,
    handleSubmit,
    register,
    setError,
    setValue,
  } = useForm<AddScheduleFormValues>({
    resolver: zodResolver(schema),
    defaultValues: createDefaultScheduleFormValues(),
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
  } = useAddScheduleFile({ clearErrors, control, getValues, setError, setValue, t });

  const mutation = useToastMutation({
    mutationFn: (values: AddScheduleFormValues) =>
      createSchedule(mapScheduleFormValuesToPayload(values)),
    invalidateKeys: [QUERY_KEYS.adminSchedules(getValues("level"))],
    pendingMessage: t("pending.submit"),
    successMessage: t("success"),
    errorMessage: (error: unknown) =>
      getApiErrorMessage(error, t("errors.submit")),
    onSuccess: () => {
      router.replace("/admin/schedules");
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
    isSubmitDisabled:
      isSubmittingFile || mutation.isPending || isSubmitting || !isDirty,
    levelOptions: SCHEDULE_LEVEL_OPTIONS,
    sectionOptions: SCHEDULE_SECTION_OPTIONS,
    onSubmit,
    openFileDialog,
    register,
    removeFile,
    t,
  };
};
