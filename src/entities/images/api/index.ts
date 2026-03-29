import { api } from "@/shared/configs";
import { API_ROUTES } from "@/shared/constants";

import { UploadImageResponseSchema } from "../model/schemas";

export const uploadImage = async (file: File) => {
  const formData = new FormData();

  formData.append("file", file);

  const { data } = await api.post(API_ROUTES.IMAGES_UPLOAD, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return UploadImageResponseSchema.parse(data);
};

export const deleteImage = async (fileUrl: string) => {
  await api.delete(API_ROUTES.IMAGES_DELETE, {
    params: {
      fileUrl,
    },
  });
};
