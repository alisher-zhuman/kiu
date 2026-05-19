import { type TuitionRow } from "../../../types";

interface Props {
  rows: ReadonlyArray<TuitionRow>;
  t: (key: string) => string;
}

export const TuitionMobileList = ({ rows, t }: Props) => (
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
              <span className="text-right font-medium text-black">{local}</span>
            </div>

            <div className="flex items-start justify-between gap-4">
              <span className="max-w-32 text-black/55">{t("columns.foreign")}</span>
              <span className="text-right font-medium text-black">{foreign}</span>
            </div>
          </div>
        </div>
      </article>
    ))}
  </div>
);
