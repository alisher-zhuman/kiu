import { z } from "zod";

export const LogInResponseSchema = z.object({
  token: z.string(),
  id: z.number(),
  email: z.email(),
  role: z.string(),
});
