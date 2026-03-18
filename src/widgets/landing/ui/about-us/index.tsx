import { useTranslations } from "next-intl";
import Image from "next/image";

export const AboutUs = () => {
  const t = useTranslations("AboutUs");

  return (
    <section
      aria-labelledby="about-us-title"
      className="max-w-400 m-auto px-5 mt-10 md:mt-30 md:px-10"
    >
      <h1 className="text-5xl md:text-6xl font-bold text-center">О нас</h1>

      <p className="md:text-3xl mt-5">
        Кыргызстан Ислам университети — Кыргызстан мусулмандарынын дин
        башкармасынын (КМДБ) алдында Ислам дининин баалуулуктарын жана шарият
        өкүмдөрүн илимий негизде үйрөткөн жогорку окуу жай. 1990-жылдардын
        башында Кыргызстандын диний башкармалыктын башчысы Кимсанбай ажы
        Абдрахманов Бишкек шаарында Ислам медресесин ачуу демилгесин көтөрүп
        чыккан. бардыгын окуу.....
      </p>

      <Image
        src="/images/about-us.webp"
        alt="О нас"
        className="w-full h-auto mt-8"
        width={400}
        height={300}
      />
    </section>
  );
};
