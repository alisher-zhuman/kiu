import { z } from "zod";

import { PROFESSOR_SECTION_OPTIONS } from "./constants";

export const ProfessorItemSchema = z.object({
  id: z.number(),
  photo: z.string(),
  fullName: z.string(),
  positions: z.array(z.string()),
  sections: z.array(z.enum(PROFESSOR_SECTION_OPTIONS)),
});

export const ProfessorActionResponseSchema = z.object({
  message: z.string(),
});

export const ProfessorsResponseSchema = z.array(ProfessorItemSchema);
