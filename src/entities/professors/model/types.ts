import { type z } from "zod";

import { type ProfessorItemSchema } from "./schemas";

export type ProfessorItem = z.infer<typeof ProfessorItemSchema>;
