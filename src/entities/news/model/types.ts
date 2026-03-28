import { type z } from "zod";

import { type NewsItemSchema } from "./schemas";

export type NewsItem = z.infer<typeof NewsItemSchema>;
