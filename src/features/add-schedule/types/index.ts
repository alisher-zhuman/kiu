import { type z } from "zod";

import { type createAddScheduleFormSchema } from "../schemas";

export type AddScheduleFormValues = z.infer<
  ReturnType<typeof createAddScheduleFormSchema>
>;
