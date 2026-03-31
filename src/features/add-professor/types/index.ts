import { type z } from "zod";

import { type createAddProfessorFormSchema } from "../schemas";

export type AddProfessorFormValues = z.infer<
  ReturnType<typeof createAddProfessorFormSchema>
>;
