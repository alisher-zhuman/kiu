import { z } from "zod";

import { createAddScheduleFormSchema } from "../schemas";

export type AddScheduleFormValues = z.infer<
  ReturnType<typeof createAddScheduleFormSchema>
>;
