import { z } from "zod";

export const ProfessorItemSchema = z.object({
  id: z.number(),
  photo: z.string(),
  fullName: z.string(),
  position: z.string(),
  section: z.enum([
    "ADMINISTRATION",
    "THEOLOGY",
    "PHILOLOGY",
    "SHARIAT",
  ]),
});

export const ProfessorsResponseSchema = z.array(ProfessorItemSchema);
