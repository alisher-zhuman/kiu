import { useTranslations } from "next-intl";
import { ExternalLink, FileText } from "lucide-react";

import { type DocumentItem } from "@/entities/documents";

interface Props {
  item: DocumentItem;
}

export const DocumentCard = ({ item }: Props) => {
  const t = useTranslations("DocumentsPage");

  return (
    <article className="flex h-full flex-col rounded-2xl border border-black/10 bg-white p-4 shadow-[0_10px_24px_rgba(0,0,0,0.035)] md:p-5">
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

      <div className="mt-auto pt-4">
        <a
          href={item.content}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-[#004C97] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#002E5C]"
        >
          <ExternalLink className="size-4" />
          {t("open")}
        </a>
      </div>
    </article>
  );
};
