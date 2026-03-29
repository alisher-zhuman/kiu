import { type z } from "zod";

import { type createAddNewsFormSchema } from "../schemas";

export type AddNewsFormValues = z.infer<
  ReturnType<typeof createAddNewsFormSchema>
>;
