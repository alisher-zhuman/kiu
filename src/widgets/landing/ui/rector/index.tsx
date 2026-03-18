import Image from "next/image";
import { useTranslations } from "next-intl";

export const Rector = () => {
  const t = useTranslations("Rector");

  return (
    <section
      aria-labelledby="rector-title"
      className="max-w-400 m-auto mt-30 px-5 md:flex md:justify-between md:gap-10 md:px-10"
    >
      <Image
        src="/images/rector.webp"
        alt={t("imageAlt")}
        className="h-auto w-full md:h-170 md:w-138.75"
        width={555}
        height={680}
        sizes="555px"
      />

      <div className="mt-8 md:mt-0">
        <h2 id="rector-title" className="text-3xl md:text-6xl font-bold">
          {t("title")}
        </h2>

        <p className="mt-3 text-xl font-semibold md:mt-4 md:text-3xl">
          {t("name")}
        </p>

        <p className="mt-5 text-base leading-7 md:mt-8 md:text-2xl md:leading-10">
          {t("message")}
        </p>
      </div>
    </section>
  );
};
