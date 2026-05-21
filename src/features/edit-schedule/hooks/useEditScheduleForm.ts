"use client";

import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";

import { useRouter } from "@/i18n/navigation";

import {
  getScheduleById,
  SCHEDULE_LEVEL_OPTIONS,
  updateSchedule,
} from "@/entities/schedules";

import { FACULTY_SECTION_OPTIONS, QUERY_KEYS } from "@/shared/constants";
import { getApiErrorMessage } from "@/shared/helpers";
import { useToastMutation } from "@/shared/hooks";

import {
  mapEditableScheduleToFormValues,
  mapScheduleFormValuesToPayload,
} from "../../add-schedule/helpers/base";
import { useAddScheduleFile } from "../../add-schedule/hooks/useAddScheduleFile";
import { createAddScheduleFormSchema } from "../../add-schedule/schemas";
import { type AddScheduleFormValues } from "../../add-schedule/types";

interface Params {
  id: number;
}

export const useEditScheduleForm = ({ id }: Params) => {
  const router = useRouter();
  
  const t = useTranslations("AdminSchedulesPage.addForm");
  const tEdit = useTranslations("AdminSchedulesPage.editForm");

  const schema = useMemo(() => createAddScheduleFormSchema(t), [t]);

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
  } = useForm<AddScheduleFormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const { data: schedule, error, isLoading } = useQuery({
    queryKey: QUERY_KEYS.adminScheduleFormById(id),
    queryFn: () => getScheduleById(id),
  });

  useEffect(() => {
    if (!schedule) return;
    reset(mapEditableScheduleToFormValues(schedule));
  }, [schedule, reset]);

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
      updateSchedule(id, mapScheduleFormValuesToPayload(values)),
    invalidateKeys: [
      ["admin-schedules"],
      QUERY_KEYS.adminScheduleFormById(id),
    ],
    pendingMessage: tEdit("pending"),
    successMessage: tEdit("success"),
    errorMessage: (err: unknown) => getApiErrorMessage(err, tEdit("error")),
    onSuccess: () => {
      router.back();
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
    sectionOptions: FACULTY_SECTION_OPTIONS,
    scheduleError: error,
    isScheduleLoading: isLoading,
    schedule,
    onSubmit,
    openFileDialog,
    register,
    removeFile,
    t,
    tEdit,
  };
};
