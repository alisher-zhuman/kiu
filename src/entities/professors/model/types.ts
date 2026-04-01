import { type z } from "zod";

import { type PROFESSOR_SECTION_OPTIONS } from "./constants";
import { type ProfessorItemSchema } from "./schemas";

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

export interface CreateProfessorPayload {
  fullName: LocalizedProfessorName;
  photo: string;
  positionsEn: string[];
  positionsKg: string[];
  positionsRu: string[];
  sections: ((typeof PROFESSOR_SECTION_OPTIONS)[number])[];
}

export type ProfessorItem = z.infer<typeof ProfessorItemSchema>;
