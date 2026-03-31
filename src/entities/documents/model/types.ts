import { type z } from "zod";

import { type DocumentItemSchema } from "./schemas";

export type DocumentItem = z.infer<typeof DocumentItemSchema>;
