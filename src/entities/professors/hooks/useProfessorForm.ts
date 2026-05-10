"use client";

import { useEffect, useMemo } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { useLocale, useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";

import { useRouter } from "@/i18n/navigation";

import { LOCALE_OPTIONS, QUERY_KEYS } from "@/shared/constants";
import { getApiErrorMessage } from "@/shared/helpers";
import { useToastMutation } from "@/shared/hooks";

import { createProfessor, getProfessorByIdForEdit, updateProfessor } from "../api";
import { PROFESSOR_SECTION_OPTIONS } from "../model/constants";
import {
  createDefaultProfessorFormValues,
  mapProfessorDetailToFormValues,
  mapProfessorFormValuesToPayload,
  toggleProfessorSectionValue,
} from "../model/helpers";
import { createProfessorFormSchema } from "../model/schemas";
import { type ProfessorDetail, type ProfessorFormValues } from "../model/types";

import { useProfessorPhoto } from "./useProfessorPhoto";

interface BaseParams {
  mode: "add" | "edit";
}

interface EditParams extends BaseParams {
  id: number;
  mode: "edit";
}

type Params = BaseParams | EditParams;

export const useProfessorForm = (params: Params) => {
  const locale = useLocale();
  const router = useRouter();

  const fieldsT = useTranslations("AdminProfessorsPage.addForm");
  const editT = useTranslations("AdminProfessorsPage.editForm");

  const isEditMode = params.mode === "edit";
  const submitT = isEditMode ? editT : fieldsT;

  const schema = useMemo(() => createProfessorFormSchema(fieldsT), [fieldsT]);

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
  } = useForm<ProfessorFormValues>({
    resolver: zodResolver(schema),
    defaultValues: createDefaultProfessorFormValues(),
    mode: "onChange",
  });

  const {
    append: appendPosition,
    fields: positionFields,
    remove: removePosition,
  } = useFieldArray({
    control,
    name: "positions",
  });

  const selectedSections = useWatch({
    control,
    defaultValue: [],
    name: "sections",
  });

  const {
    fileInputRef,
    handlePhotoSelect,
    isPhotoDeletePending,
    isPhotoUploadDisabled,
    isSubmittingPhoto,
    openFileDialog,
    removePhoto,
  } = useProfessorPhoto({
    clearErrors,
    getValues,
    setError,
    setValue,
    t: fieldsT,
  });

  const {
    data: professor,
    error: professorError,
    isLoading: isProfessorLoading,
  } = useQuery({
    queryKey:
      isEditMode && "id" in params
        ? QUERY_KEYS.adminProfessorById(locale, params.id)
        : ["admin-professor-idle", locale],
    queryFn: () => getProfessorByIdForEdit((params as EditParams).id),
    enabled: isEditMode,
  });

  useEffect(() => {
    if (!professor) {
      return;
    }

    reset(mapProfessorDetailToFormValues(professor));
  }, [professor, reset]);

  const mutation = useToastMutation({
    mutationFn: (values: ProfessorFormValues) => {
      const payload = mapProfessorFormValuesToPayload(values);

      if (isEditMode && "id" in params) {
        return updateProfessor(params.id, payload);
      }

      return createProfessor(payload);
    },
    invalidateKeys:
      isEditMode && "id" in params
        ? [
            QUERY_KEYS.adminProfessorById(locale, params.id),
            QUERY_KEYS.adminProfessors(locale),
          ]
        : [QUERY_KEYS.adminProfessors(locale)],
    pendingMessage: submitT("pending.submit"),
    successMessage: submitT("success"),
    errorMessage: (error: unknown) =>
      getApiErrorMessage(error, submitT("errors.submit")),
    onSuccess: () => {
      router.replace("/admin/professors");
    },
  });

  const onSubmit = handleSubmit((values) => {
    mutation.mutate(values);
  });

  const toggleSection = (
    section: (typeof PROFESSOR_SECTION_OPTIONS)[number],
  ) => {
    setValue(
      "sections",
      toggleProfessorSectionValue(selectedSections, section),
      {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      },
    );
  };

  return {
    addPosition: () => appendPosition({ en: "", kg: "", ru: "" }),
    editT,
    errors,
    fieldsT,
    fileInputRef,
    handlePhotoSelect,
    isPhotoDeletePending,
    isPhotoUploadDisabled,
    isProfessorLoading,
    isSubmitDisabled:
      isSubmittingPhoto ||
      mutation.isPending ||
      isSubmitting ||
      (isEditMode && !isDirty),
    localeOptions: LOCALE_OPTIONS,
    onSubmit,
    openFileDialog,
    photo: getValues("photo"),
    positionFields,
    professor: (professor ?? null) as ProfessorDetail | null,
    professorError,
    professorSectionOptions: PROFESSOR_SECTION_OPTIONS,
    register,
    removePhoto,
    removePosition,
    selectedSections,
    t: fieldsT,
    toggleSection,
  };
};
