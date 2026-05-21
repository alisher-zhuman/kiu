"use client";

import { useTranslations } from "next-intl";

import { CopyButton } from "@/shared/ui/copy-button";
import { PageTitle } from "@/shared/ui/page-title";

interface BankInfo {
  name: string;
  forWhom: string;
  accountNumber: string;
  note: string | null;
  workingDay: string;
  lunchBreak: string;
  weekends: string;
}

export const StudentsTuition = () => {
  const t = useTranslations("StudentsTuitionPage");
  const banks = t.raw("banks") as ReadonlyArray<BankInfo>;

  return (
    <main className="mx-auto max-w-400 px-5 py-10 text-black md:px-10 md:py-16">
      <section className="space-y-10 md:space-y-12">
        <PageTitle>{t("title")}</PageTitle>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {banks.map((bank) => (
            <article
              key={bank.accountNumber}
              className="flex flex-col rounded-3xl border border-black/10 bg-white p-6 shadow-[0_14px_32px_rgba(0,0,0,0.04)] md:p-8"
            >
              <div>
                <h2 className="text-xl font-bold tracking-tight md:text-2xl">
                  {bank.forWhom}
                </h2>
                <p className="mt-1 text-sm text-black/45">{bank.name}</p>
              </div>

              <div className="mt-5 rounded-2xl bg-[#004C97]/6 px-5 py-4 md:px-6 md:py-5">
                <p className="text-xs font-medium uppercase tracking-widest text-black/40">
                  {t("accountLabel")}
                </p>
                <div className="mt-1.5 flex items-center justify-between">
                  <p className="text-xl font-bold tracking-wider text-[#004C97] md:text-2xl">
                    {bank.accountNumber}
                  </p>
                  <CopyButton value={bank.accountNumber} label={t("accountLabel")} />
                </div>
                {bank.note ? (
                  <p className="mt-1 text-sm text-black/50">{bank.note}</p>
                ) : null}
              </div>

              <div className="mt-auto pt-5 space-y-2">
                <p className="text-xs font-medium uppercase tracking-widest text-black/40">
                  {t("hoursLabel")}
                </p>
                <div className="space-y-1.5 text-sm text-black/70 md:text-base">
                  <p>{bank.workingDay}</p>
                  <p>{bank.lunchBreak}</p>
                  <p>{bank.weekends}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};
