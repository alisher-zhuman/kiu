import { z } from "zod";

import { PROFESSOR_SECTION_OPTIONS } from "./constants";

export const LocalizedProfessorNameSchema = z.object({
  en: z.string(),
  kg: z.string(),
  ru: z.string(),
});

export const createProfessorFormSchema = (t: (key: string) => string) => {
  return z.object({
    fullName: z.object({
      en: z.string().trim().min(1, t("errors.fullName.required")),
      kg: z.string().trim().min(1, t("errors.fullName.required")),
      ru: z.string().trim().min(1, t("errors.fullName.required")),
    }),
    photo: z.string().trim().min(1, t("errors.photo.required")),
    positions: z
      .array(
        z.object({
          en: z.string().trim().min(1, t("errors.position.required")),
          kg: z.string().trim().min(1, t("errors.position.required")),
          ru: z.string().trim().min(1, t("errors.position.required")),
        }),
      )
      .min(1, t("errors.position.min")),
    sections: z
      .array(
        z.enum(PROFESSOR_SECTION_OPTIONS, {
          error: () => t("errors.section.required"),
        }),
      )
      .min(1, t("errors.section.required")),
  });
};

export const ProfessorItemSchema = z.object({
  id: z.number(),
  photo: z.string(),
  fullName: z.string(),
  positions: z.array(z.string()),
  sections: z.array(z.enum(PROFESSOR_SECTION_OPTIONS)),
});

export const ProfessorDetailSchema = z.object({
  fullName: LocalizedProfessorNameSchema,
  photo: z.string(),
  positionsEn: z.array(z.string()),
  positionsKg: z.array(z.string()),
  positionsRu: z.array(z.string()),
  sections: z.array(z.enum(PROFESSOR_SECTION_OPTIONS)),
});

export const ProfessorActionResponseSchema = z.object({
  message: z.string(),
});

export const ProfessorsResponseSchema = z.array(ProfessorItemSchema);
