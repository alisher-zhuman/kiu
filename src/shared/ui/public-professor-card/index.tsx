import Image from "next/image";

import { type ProfessorItem } from "@/entities/professors";

interface Props {
  item: ProfessorItem;
  priority?: boolean;
}

export const PublicProfessorCard = ({ item, priority = false }: Props) => (
  <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_14px_32px_rgba(0,0,0,0.04)]">
    <div className="p-2">
      <Image
        src={item.photo}
        alt={item.fullName}
        width={1200}
        height={1200}
        loading={priority ? "eager" : "lazy"}
        className="aspect-[4/4.2] w-full rounded-[1.2rem] object-cover"
      />
    </div>

    <div className="flex flex-1 flex-col space-y-3 p-5 pt-3 md:p-6 md:pt-4">
      <h2 className="text-lg font-semibold tracking-tight text-black md:text-xl">
        {item.fullName}
      </h2>

      <div className="space-y-1.5">
        {item.positions.map((position, index) => (
          <p
            key={`${item.id}-position-${index}`}
            className="text-sm leading-6 text-black/70 md:text-base md:leading-7"
          >
            {position}
          </p>
        ))}
      </div>
    </div>
  </article>
);
