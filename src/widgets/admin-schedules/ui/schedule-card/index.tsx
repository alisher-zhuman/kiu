import { useTranslations } from "next-intl";
import { FileText, PencilLine } from "lucide-react";

import { Link } from "@/i18n/navigation";

import { DeleteScheduleButton } from "@/features/delete-schedule";

import { type ScheduleItem } from "@/entities/schedules";

import { AdminOpenFileLink } from "@/shared/ui/admin-open-file-link";

interface Props {
  item: ScheduleItem;
}

export const ScheduleCard = ({ item }: Props) => {
  const t = useTranslations("AdminSchedulesPage");
  const tEdit = useTranslations("AdminSchedulesPage.editForm");

  return (
    <article className="flex h-full flex-col rounded-2xl border border-black/10 bg-white p-4 shadow-[0_10px_24px_rgba(0,0,0,0.035)]">
      <div className="flex items-start gap-3">
        <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#004C97]/8 text-[#004C97]">
          <FileText className="size-5" />
        </span>

        <div className="min-w-0 space-y-1">
          <h2 className="text-base font-semibold tracking-tight text-black md:text-lg">
            {item.title}
          </h2>
          <p className="text-xs text-black/60">{item.dateOfPublication}</p>
        </div>
      </div>

      <div className="mt-auto flex flex-wrap justify-end gap-2 pt-4">
        <AdminOpenFileLink href={item.content} ariaLabel={t("open")} label={t("open")} />

        <Link
          href={`/admin/schedules/${item.id}/edit`}
          aria-label={tEdit("action")}
          className="inline-flex size-9 items-center justify-center rounded-full bg-black/6 text-black transition-colors hover:bg-black/10"
        >
          <PencilLine className="size-4" />
        </Link>

        <DeleteScheduleButton id={item.id} />
      </div>
    </article>
  );
};
