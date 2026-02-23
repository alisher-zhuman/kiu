import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const NotFoundPage = async () => {
  const t = await getTranslations("NotFoundPage");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">
        404
      </p>
      <h1 className="text-3xl font-semibold text-zinc-900">{t("title")}</h1>
      <p className="max-w-md text-zinc-600">{t("description")}</p>
      <Link
        href="/"
        className="rounded-full border border-zinc-900 px-5 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-900 hover:text-white"
      >
        {t("action")}
      </Link>
    </main>
  );
};

export default NotFoundPage;
