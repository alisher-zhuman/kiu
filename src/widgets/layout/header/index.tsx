import Image from "next/image";

export const Header = () => {
  return (
    <header className="flex items-center justify-between">
      <div />

      <div className="flex items-center">
        <Image
          src="/icons/logo.svg"
          alt="Сделай локализацию в alt"
          width={92}
          height={92}
        />

        <p className="text-lg font-light w-30">
          Кыргызский Исламский Университет
        </p>
      </div>

      <div>Switcher</div>
    </header>
  );
};
