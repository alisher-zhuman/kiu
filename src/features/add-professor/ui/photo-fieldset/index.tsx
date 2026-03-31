"use client";

import { type ChangeEvent, type RefObject } from "react";
import Image from "next/image";
import { Camera, X } from "lucide-react";

import { cn } from "@/shared/helpers";

interface Props {
  errorMessage: string | undefined;
  fileInputRef: RefObject<HTMLInputElement | null>;
  handlePhotoSelect: (event: ChangeEvent<HTMLInputElement>) => void;
  isDeletePending: boolean;
  isUploadDisabled: boolean;
  openFileDialog: () => void;
  photo: string;
  removePhoto: () => Promise<void>;
  t: (key: string) => string;
}

export const PhotoFieldset = ({
  errorMessage,
  fileInputRef,
  handlePhotoSelect,
  isDeletePending,
  isUploadDisabled,
  openFileDialog,
  photo,
  removePhoto,
  t,
}: Props) => (
  <div className="space-y-4">
    <h2 className="text-xl font-medium tracking-tight text-black md:text-2xl">
      {t("photoTitle")}
    </h2>

    <div className="max-w-36 md:max-w-40">
      <button
        type="button"
        onClick={photo ? undefined : openFileDialog}
        disabled={isUploadDisabled && !photo}
        className={cn(
          "relative flex aspect-square w-full overflow-hidden rounded-[0.95rem] bg-black/6 text-left",
          !photo && "cursor-pointer transition-colors hover:bg-black/8",
          isUploadDisabled &&
            !photo &&
            "cursor-not-allowed opacity-55 hover:bg-black/6",
        )}
      >
        {photo ? (
          <>
            <Image
              src={photo}
              alt={t("photoPreviewAlt")}
              fill
              className="object-cover"
            />

            <span className="sr-only">{t("photoPreviewAlt")}</span>

            <span
              onClick={(event) => {
                event.stopPropagation();
                void removePhoto();
              }}
              className={cn(
                "absolute top-2 right-2 inline-flex size-6 items-center justify-center rounded-full bg-black/70 text-white transition-colors hover:bg-black",
                isDeletePending && "pointer-events-none opacity-60",
              )}
              role="button"
              tabIndex={-1}
              aria-label={t("removePhoto")}
            >
              <X className="size-3" />
            </span>
          </>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-8 px-3 text-center text-black/35">
            <Camera className="size-9 stroke-[1.5] md:size-10" />
            <span className="text-[11px] font-medium leading-4 md:text-xs">
              {t("photoHint")}
            </span>
          </div>
        )}
      </button>
    </div>

    {errorMessage ? (
      <p className="text-sm text-red-500 md:text-base">{errorMessage}</p>
    ) : null}

    <input
      ref={fileInputRef}
      type="file"
      accept="image/*"
      className="sr-only"
      onChange={handlePhotoSelect}
    />
  </div>
);
