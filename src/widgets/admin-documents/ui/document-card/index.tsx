import { useTranslations } from "next-intl";
import { ExternalLink, FileText, Pencil } from "lucide-react";

import { Link } from "@/i18n/navigation";

import { DeleteDocumentButton } from "@/features/delete-document";

import { type DocumentItem } from "@/entities/documents";

interface Props {
  item: DocumentItem;
}

export const DocumentCard = ({ item }: Props) => {
  const t = useTranslations("AdminDocumentsPage");
  const tDocTypes = useTranslations("AdminDocumentsPage.addForm");

  return (
    <article className="flex h-full flex-col rounded-2xl border border-black/10 bg-white p-4 shadow-[0_10px_24px_rgba(0,0,0,0.035)]">
      <div className="flex items-start gap-3">
        <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#004C97]/8 text-[#004C97]">
          <FileText className="size-5" />
        </span>

        <div className="min-w-0 space-y-2">
          <span className="inline-flex w-fit items-center rounded-full bg-black/6 px-2.5 py-1 text-xs font-medium text-black/70">
            {tDocTypes(`docTypes.${item.docType}`)}
          </span>

          <h2 className="text-base font-semibold tracking-tight text-black md:text-lg">
            {item.title}
          </h2>
        </div>
      </div>

      <div className="mt-auto flex flex-wrap gap-2 pt-4">
        <a
          href={item.content}
          target="_blank"
          rel="noreferrer"
          aria-label={t("open")}
          className="inline-flex size-9 items-center justify-center rounded-full bg-[#004C97] text-white transition-colors hover:bg-[#002E5C] md:size-auto md:px-4 md:py-2 md:text-sm md:font-semibold"
        >
          <ExternalLink className="size-4 md:hidden" />
          <span className="hidden md:inline">{t("open")}</span>
        </a>

        <Link
          href={`/admin/documents/${item.id}/edit`}
          aria-label={t("edit.action")}
          className="inline-flex size-9 items-center justify-center rounded-full border border-[#004C97]/15 bg-[#004C97]/6 text-[#004C97] transition-colors hover:bg-[#004C97]/10 md:size-auto md:px-4 md:py-2 md:text-sm md:font-semibold"
        >
          <Pencil className="size-4 md:hidden" />
          <span className="hidden md:inline">{t("edit.action")}</span>
        </Link>

        <DeleteDocumentButton id={item.id} />
      </div>
    </article>
  );
};
