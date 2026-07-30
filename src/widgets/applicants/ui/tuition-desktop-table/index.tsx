import { type TuitionRow } from "../../types";

interface Props {
  rows: ReadonlyArray<TuitionRow>;
  t: (key: string) => string;
}

export const TuitionDesktopTable = ({ rows, t }: Props) => {
  const hasAdmission = rows.some((r) => r.admission);

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b-2 border-black/8">
          <th className="pb-4 pr-10 text-left text-xs font-semibold uppercase tracking-widest text-black/40">
            {t("columns.program")}
          </th>
          <th className="pb-4 pr-10 text-left text-xs font-semibold uppercase tracking-widest text-black/40">
            {t("columns.local")}
          </th>
          <th
            className={`pb-4 text-left text-xs font-semibold uppercase tracking-widest text-black/40${hasAdmission ? " pr-10" : ""}`}
          >
            {t("columns.foreign")}
          </th>
          {hasAdmission && (
            <th className="pb-4 text-left text-xs font-semibold uppercase tracking-widest text-black/40">
              {t("columns.admission")}
            </th>
          )}
        </tr>
      </thead>

      <tbody>
        {rows.map(({ program, local, foreign, admission }, index) => (
          <tr
            key={program}
            className={index < rows.length - 1 ? "border-b border-black/6" : undefined}
          >
            <td className="py-5 pr-10 text-base font-medium text-black">{program}</td>
            <td className="py-5 pr-10 text-base text-black/60">{local}</td>
            <td className={`py-5 text-base text-black/60${hasAdmission ? " pr-10" : ""}`}>
              {foreign}
            </td>
            {hasAdmission && <td className="py-5 text-base text-black/60">{admission}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
