import { useTranslations } from "next-intl";

import { Reveal } from "@/shared/ui/reveal";

import { type TuitionRow } from "../../types";

export const Tuition = () => {
  const t = useTranslations("TuitionPage");
  const rows = t.raw("rows") as ReadonlyArray<TuitionRow>;

  return (
    <main className="mx-auto max-w-400 px-5 py-10 text-black md:px-10 md:py-16">
      <section className="space-y-8 md:space-y-10">
        <Reveal>
          <div className="border-l-2 border-black pl-3 md:pl-4">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-5xl">
              {t("title")}
            </h1>
          </div>
        </Reveal>

        <Reveal delay={50} className="md:hidden">
          <div className="space-y-4">
            {rows.map(({ program, local, foreign }) => (
              <article
                key={program}
                className="rounded-3xl border border-black/10 bg-white p-5 shadow-[0_14px_32px_rgba(0,0,0,0.04)]"
              >
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold tracking-tight text-black">
                    {program}
                  </h2>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-start justify-between gap-4">
                      <span className="text-black/55">{t("columns.local")}</span>
                      <span className="text-right font-medium text-black">
                        {local}
                      </span>
                    </div>

                    <div className="flex items-start justify-between gap-4">
                      <span className="max-w-32 text-black/55">
                        {t("columns.foreign")}
                      </span>
                      <span className="text-right font-medium text-black">
                        {foreign}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Reveal>

        <Reveal delay={50} className="hidden md:block">
          <div className="overflow-hidden rounded-4xl border border-black/10 bg-white shadow-[0_18px_38px_rgba(0,0,0,0.05)]">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-black/10 bg-black/3 text-left">
                  <th className="px-7 py-5 text-base font-semibold text-black">
                    {t("columns.program")}
                  </th>
                  <th className="px-7 py-5 text-base font-semibold text-black">
                    {t("columns.local")}
                  </th>
                  <th className="px-7 py-5 text-base font-semibold text-black">
                    {t("columns.foreign")}
                  </th>
                </tr>
              </thead>

              <tbody>
                {rows.map(({ program, local, foreign }, index) => (
                  <tr
                    key={program}
                    className={index < rows.length - 1 ? "border-b border-black/10" : undefined}
                  >
                    <td className="px-7 py-5 text-lg font-medium text-black">
                      {program}
                    </td>
                    <td className="px-7 py-5 text-lg text-black/80">{local}</td>
                    <td className="px-7 py-5 text-lg text-black/80">
                      {foreign}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </section>
    </main>
  );
};
