"use client";

import { type ChangeEvent, type RefObject } from "react";
import { FileText, Plus, X } from "lucide-react";

import { cn } from "@/shared/helpers";

interface Props {
  errorMessage: string | undefined;
  fileInputRef: RefObject<HTMLInputElement | null>;
  fileName: string;
  handleFileSelect: (event: ChangeEvent<HTMLInputElement>) => void;
  isDeletePending: boolean;
  isUploadDisabled: boolean;
  openFileDialog: () => void;
  removeFile: () => Promise<void>;
  t: (key: string) => string;
}

export const FileFieldset = ({
  errorMessage,
  fileInputRef,
  fileName,
  handleFileSelect,
  isDeletePending,
  isUploadDisabled,
  openFileDialog,
  removeFile,
  t,
}: Props) => (
  <div className="space-y-4">
    <h2 className="text-xl font-medium tracking-tight text-black md:text-2xl">{t("fileTitle")}</h2>

    <div className="max-w-80">
      {fileName ? (
        <div className="relative flex min-h-24 items-center gap-3 overflow-hidden rounded-[0.95rem] bg-black/6 px-4 py-4">
          <div className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-black/8 text-black/40">
            <FileText className="size-6 stroke-[1.8]" />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-black">{fileName || t("emptyFile")}</p>

            <p className="text-xs text-black/45">PDF</p>
          </div>

          <button
            type="button"
            onClick={removeFile}
            disabled={isDeletePending}
            aria-label={t("removeFile")}
            className="absolute top-2 right-2 inline-flex size-6 cursor-pointer items-center justify-center rounded-full bg-black/70 text-white transition-colors hover:bg-black"
          >
            <X className="size-3" />
          </button>
        </div>
      ) : null}
      {!fileName ? (
        <button
          type="button"
          onClick={openFileDialog}
          disabled={isUploadDisabled}
          className={cn(
            "flex min-h-24 w-full cursor-pointer items-center gap-3 overflow-hidden rounded-[0.95rem] bg-black/6 px-4 py-4 text-left transition-colors hover:bg-black/8",
            isUploadDisabled && "cursor-not-allowed opacity-55 hover:bg-black/6"
          )}
        >
          <div className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-black/8 text-black/40">
            <Plus className="size-5 stroke-2" />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-medium text-black">{t("addFile")}</p>
            <p className="text-xs text-black/45">{t("emptyFile")}</p>
          </div>
        </button>
      ) : null}
    </div>

    {errorMessage ? <p className="text-sm text-red-500 md:text-base">{errorMessage}</p> : null}

    <input
      ref={fileInputRef}
      type="file"
      accept="application/pdf,.pdf"
      className="sr-only"
      onChange={handleFileSelect}
    />
  </div>
);
