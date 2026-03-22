import Image from "next/image";

interface Props {
  mission: string;
  missionTitle: string;
}

export const MissionBlock = ({ mission, missionTitle }: Props) => (
  <div className="relative">
    <div className="pointer-events-none absolute inset-x-0 top-1/2 hidden -translate-y-1/2 justify-center md:flex">
      <Image
        src="/icons/logo.svg"
        alt=""
        aria-hidden="true"
        className="h-auto w-md opacity-10"
        width={448}
        height={448}
      />
    </div>

    <div className="relative z-10 space-y-6 md:space-y-8">
      <h2 className="text-2xl font-bold tracking-tight text-black md:text-4xl">
        {missionTitle}
      </h2>

      <p>{mission}</p>
    </div>
  </div>
);
