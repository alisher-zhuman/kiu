import { type z } from "zod";

import { type PROFESSOR_SECTION_OPTIONS } from "./constants";
import { type createProfessorFormSchema, type ProfessorItemSchema } from "./schemas";

export type ProfessorSection = (typeof PROFESSOR_SECTION_OPTIONS)[number];

export interface LocalizedProfessorName {
  en: string;
  kg: string;
  ru: string;
}

export interface LocalizedProfessorPosition {
  en: string;
  kg: string;
  ru: string;
}

export interface ProfessorPositionFormValue {
  en: string;
  kg: string;
  ru: string;
}

export interface CreateProfessorPayload {
  fullName: LocalizedProfessorName;
  photo: string;
  positionsEn: string[];
  positionsKg: string[];
  positionsRu: string[];
  sections: ProfessorSection[];
}

export interface ProfessorDetail {
  fullName: LocalizedProfessorName;
  photo: string;
  positionsEn: string[];
  positionsKg: string[];
  positionsRu: string[];
  sections: ProfessorSection[];
}

export type ProfessorFormValues = z.infer<ReturnType<typeof createProfessorFormSchema>>;
export type ProfessorItem = z.infer<typeof ProfessorItemSchema>;
