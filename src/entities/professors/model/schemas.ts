import { z } from "zod";

import { PROFESSOR_SECTION_OPTIONS } from "./constants";

export const LocalizedProfessorNameSchema = z.object({
  en: z.string(),
  kg: z.string(),
  ru: z.string(),
});

const ProfessorDetailFullNameSchema = z
  .object({
    ENGLISH: z.string(),
    KYRGYZ: z.string(),
    RUSSIAN: z.string(),
  })
  .transform((fullName) => ({
    en: fullName.ENGLISH,
    kg: fullName.KYRGYZ,
    ru: fullName.RUSSIAN,
  }));

export const ProfessorItemSchema = z.object({
  id: z.number(),
  photo: z.string(),
  fullName: z.string(),
  positions: z.array(z.string()),
  sections: z.array(z.enum(PROFESSOR_SECTION_OPTIONS)),
});

export const ProfessorDetailSchema = z.object({
  fullName: ProfessorDetailFullNameSchema,
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
