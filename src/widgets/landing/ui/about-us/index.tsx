import Image from "next/image";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

import { Reveal } from "@/shared/ui/reveal";

export const AboutUs = () => {
  const t = useTranslations("AboutUs");

  return (
    <Reveal>
      <section
        aria-labelledby="about-us-title"
        className="max-w-400 m-auto mt-30 px-5 md:px-10"
      >
        <h2
          id="about-us-title"
          className="text-4xl font-bold text-center md:text-6xl"
        >
          {t("title")}
        </h2>

        <p className="mt-10 md:text-3xl">
          {t.rich("body", {
            readMore: (chunks) => (
              <Link href="/history" className="font-semibold text-inherit">
                {chunks}
              </Link>
            ),
          })}
        </p>

        <Image
          src="/images/about-us.webp"
          alt={t("imageAlt")}
          className="mt-8 h-auto w-full"
          width={400}
          height={300}
          sizes="(min-width: 1024px) 1280px, 100vw"
        />
      </section>
    </Reveal>
  );
};
