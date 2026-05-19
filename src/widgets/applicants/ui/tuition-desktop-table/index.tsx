import { type TuitionRow } from "../../types";

interface Props {
  rows: ReadonlyArray<TuitionRow>;
  t: (key: string) => string;
}

export const TuitionDesktopTable = ({ rows, t }: Props) => (
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
            <td className="px-7 py-5 text-lg font-medium text-black">{program}</td>
            <td className="px-7 py-5 text-lg text-black/80">{local}</td>
            <td className="px-7 py-5 text-lg text-black/80">{foreign}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
