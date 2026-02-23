import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = Readonly<{
  params: Promise<{ locale: string }>;
}>;

const HomePage = async ({ params }: Props) => {
  const { locale } = await params;

  setRequestLocale(locale);

  const t = await getTranslations("HomePage");

  return <h1>{t("title")}</h1>;
};

export default HomePage;
