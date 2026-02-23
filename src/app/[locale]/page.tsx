import { Link } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = Readonly<{
  params: Promise<{ locale: string }>;
}>;

const localeLabels: Record<AppLocale, string> = {
  kg: "KG",
  ru: "RU",
  en: "EN",
};

const HomePage = async ({ params }: Props) => {
  const { locale } = await params;

  setRequestLocale(locale);

  const t = await getTranslations("HomePage");

  return (
    <main className="p-6">
      <nav className="mb-6 flex gap-2">
        {routing.locales.map((item) => {
          const isActive = item === locale;

          return (
            <Link
              key={item}
              href="/"
              locale={item}
              className={`rounded border px-3 py-1 text-sm ${
                isActive ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              {localeLabels[item]}
            </Link>
          );
        })}
      </nav>

      <h1>{t("title")}</h1>
    </main>
  );
};

export default HomePage;
