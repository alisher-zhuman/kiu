import { z } from "zod";

import { PROFESSOR_SECTION_OPTIONS } from "@/entities/professors";

import { MAX_PROFESSOR_PHOTO_SIZE_BYTES } from "../constants";

export const createAddProfessorFormSchema = (
  t: (key: string) => string,
) => {
  return z.object({
    fullName: z.object({
      en: z.string().trim().min(1, t("errors.fullName.required")),
      kg: z.string().trim().min(1, t("errors.fullName.required")),
      ru: z.string().trim().min(1, t("errors.fullName.required")),
    }),
    photo: z.string().trim().min(1, t("errors.photo.required")),
    position: z.string().trim().min(1, t("errors.position.required")),
    section: z.enum(PROFESSOR_SECTION_OPTIONS, {
      error: () => t("errors.section.required"),
    }),
  });
};

export { MAX_PROFESSOR_PHOTO_SIZE_BYTES };
