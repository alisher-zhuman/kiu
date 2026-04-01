import Image from "next/image";
import { useTranslations } from "next-intl";

import { DeleteProfessorButton } from "@/features/delete-professor";

import { type ProfessorItem } from "@/entities/professors";

interface Props {
  item: ProfessorItem;
  priority?: boolean;
}

export const ProfessorCard = ({ item, priority = false }: Props) => {
  const t = useTranslations("AdminProfessorsPage");

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-black/10 bg-white text-left shadow-[0_8px_20px_rgba(0,0,0,0.035)]">
      <div className="p-1.5">
        <Image
          src={item.photo}
          alt={item.fullName}
          width={1200}
          height={1200}
          loading={priority ? "eager" : "lazy"}
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

        <div className="pt-1">
          <DeleteProfessorButton id={item.id} />
        </div>
      </div>
    </article>
  );
};
