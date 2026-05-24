import { useTranslations } from "next-intl";
import { FileText } from "lucide-react";

import { DeleteDocumentButton } from "@/features/delete-document";

import { AdminOpenFileLink } from "@/shared/ui/admin-open-file-link";

import { type DocumentItem } from "@/entities/documents";

interface Props {
  item: DocumentItem;
}

export const DocumentCard = ({ item }: Props) => {
  const t = useTranslations("AdminDocumentsPage");

  return (
    <article className="flex h-full flex-col rounded-2xl border border-black/10 bg-white p-4 shadow-[0_10px_24px_rgba(0,0,0,0.035)]">
      <div className="flex items-start gap-3">
        <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#004C97]/8 text-[#004C97]">
          <FileText className="size-5" />
        </span>

        <div className="min-w-0">
          <h2 className="text-base font-semibold tracking-tight text-black md:text-lg">
            {item.title}
          </h2>
        </div>
      </div>

      <div className="mt-auto flex flex-wrap justify-end gap-2 pt-4">
        <AdminOpenFileLink
          href={item.content}
          ariaLabel={t("open")}
          label={t("open")}
        />

        <DeleteDocumentButton docType={item.docType} id={item.id} />
      </div>
    </article>
  );
};
