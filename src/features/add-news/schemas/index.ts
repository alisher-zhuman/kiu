import { z } from "zod";

import {
  MAX_NEWS_IMAGE_SIZE_BYTES,
  MAX_NEWS_IMAGES_COUNT,
} from "../constants";

export const createAddNewsFormSchema = (t: (key: string) => string) => {
  return z.object({
    images: z
      .array(z.url())
      .min(1, t("errors.images.required"))
      .max(MAX_NEWS_IMAGES_COUNT, t("errors.images.max"))
      .refine(
        (images) => images.every((url) => typeof url === "string" && url.length),
        t("errors.images.required"),
      ),
  });
};

export { MAX_NEWS_IMAGE_SIZE_BYTES,MAX_NEWS_IMAGES_COUNT };
