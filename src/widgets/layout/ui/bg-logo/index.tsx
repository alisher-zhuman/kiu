import Image from "next/image";

export const BgLogo = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      <Image
        src="/icons/logo.svg"
        alt=""
        width={620}
        height={620}
        className="h-auto w-90 opacity-15 sm:w-110 md:w-170"
      />
    </div>
  );
};
