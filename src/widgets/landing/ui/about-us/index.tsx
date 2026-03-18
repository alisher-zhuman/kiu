import Image from "next/image";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

export const AboutUs = () => {
  const t = useTranslations("AboutUs");

  return (
    <section
      aria-labelledby="about-us-title"
      className="max-w-400 m-auto px-5 mt-30 md:px-10"
    >
      <h2
        id="about-us-title"
        className="text-4xl md:text-6xl font-bold text-center"
      >
        {t("title")}
      </h2>

      <p className="md:text-3xl mt-10">
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
        className="mt-8 w-full h-auto"
        width={400}
        height={300}
        sizes="(min-width: 1024px) 1280px, 100vw"
      />
    </section>
  );
};
