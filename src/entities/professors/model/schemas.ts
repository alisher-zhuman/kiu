import { z } from "zod";

import { PROFESSOR_SECTION_OPTIONS } from "./constants";

export const ProfessorItemSchema = z.object({
  id: z.number(),
  photo: z.string(),
  fullName: z.string(),
  position: z.string(),
  section: z.enum(PROFESSOR_SECTION_OPTIONS),
});

export const ProfessorActionResponseSchema = z.object({
  message: z.string(),
});

export const ProfessorsResponseSchema = z.array(ProfessorItemSchema);
