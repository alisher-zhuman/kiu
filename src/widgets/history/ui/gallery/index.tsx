import Image from "next/image";

interface Props {
  firstImageAlt: string;
  secondImageAlt: string;
}

export const Gallery = ({ firstImageAlt, secondImageAlt }: Props) => (
  <div className="grid grid-cols-2 gap-3 md:w-64 md:grid-cols-1 md:gap-6 lg:w-72">
    <div className="overflow-hidden rounded-sm ring-1 ring-black/8">
      <Image
        src="/images/first-building.webp"
        alt={firstImageAlt}
        className="aspect-4/5 h-full w-full object-cover"
        width={320}
        height={400}
        sizes="(min-width: 1024px) 288px, 50vw"
      />
    </div>

    <div className="overflow-hidden rounded-sm ring-1 ring-black/8">
      <Image
        src="/images/second-building.webp"
        alt={secondImageAlt}
        className="aspect-4/5 h-full w-full object-cover"
        width={320}
        height={400}
        sizes="(min-width: 1024px) 288px, 50vw"
      />
    </div>
  </div>
);
