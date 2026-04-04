import Image from "next/image";
import { useTranslations } from "next-intl";
import { PencilLine } from "lucide-react";

import { Link } from "@/i18n/navigation";

import { DeleteProfessorButton } from "@/features/delete-professor";

import { type ProfessorItem } from "@/entities/professors";

interface Props {
  item: ProfessorItem;
}

export const ProfessorCard = ({ item }: Props) => {
  const t = useTranslations("AdminProfessorsPage");

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-black/10 bg-white text-left shadow-[0_8px_20px_rgba(0,0,0,0.035)]">
      <div className="p-1.5">
        <Image
          src={item.photo}
          alt={item.fullName}
          width={1200}
          height={1200}
          sizes="(min-width: 1280px) 16rem, (min-width: 1024px) 22vw, (min-width: 640px) 50vw, 100vw"
          className="aspect-[4/4.2] w-full rounded-md object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col space-y-2 p-3">
        <div className="flex flex-wrap gap-1.5">
          {item.sections.map((section) => (
            <span
              key={`${item.id}-${section}`}
              className="inline-flex w-fit items-center rounded-full bg-[#004C97]/8 px-1.5 py-0.5 text-[10px] font-medium text-[#004C97]"
            >
              {t(`sections.${section}`)}
            </span>
          ))}
        </div>

        <div className="space-y-1">
          <h2 className="text-sm font-semibold tracking-tight text-black md:text-base">
            {item.fullName}
          </h2>

          <div className="space-y-0.5">
            {item.positions.map((position, index) => (
              <p
                key={`${item.id}-position-${index}`}
                className="text-xs leading-5 text-black/70 md:text-sm"
              >
                {position}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-auto flex flex-wrap gap-2 pt-1">
          <Link
            href={`/admin/professors/${item.id}/edit`}
            aria-label={t("edit.action")}
            className="inline-flex size-9 items-center justify-center rounded-full border border-[#004C97]/15 bg-[#004C97]/6 text-[#004C97] transition-colors hover:bg-[#004C97]/10 md:size-auto md:px-4 md:py-2 md:text-sm md:font-semibold"
          >
            <PencilLine className="size-4 md:hidden" />
            <span className="hidden md:inline">{t("edit.action")}</span>
          </Link>

          <DeleteProfessorButton id={item.id} iconOnlyOnMobile />
        </div>
      </div>
    </article>
  );
};
