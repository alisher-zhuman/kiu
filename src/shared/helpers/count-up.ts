interface CounterMeta {
  hasGrouping: boolean;
  suffix: string;
  targetValue: number;
  usesSpaceGrouping: boolean;
}

export const getCounterMeta = (target: string): CounterMeta => {
  const sanitizedTarget = target.trim();
  const suffix = sanitizedTarget.endsWith("%") ? "%" : "";
  const numericTarget = Number(sanitizedTarget.replace(/[^\d]/g, ""));

  return {
    hasGrouping: /[\s,\u00A0\u202F]/.test(sanitizedTarget),
    suffix,
    targetValue: Number.isFinite(numericTarget) ? numericTarget : 0,
    usesSpaceGrouping: sanitizedTarget.includes(" "),
  };
};

export const formatCount = (
  value: number,
  locale: string,
  { hasGrouping, suffix, usesSpaceGrouping }: CounterMeta,
) => {
  const formatter = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 0,
    useGrouping: hasGrouping,
  });

  let formattedValue = formatter.format(Math.round(value));

  if (usesSpaceGrouping) {
    formattedValue = formattedValue
      .replace(/,/g, " ")
      .replace(/[\u00A0\u202F]/g, " ");
  }

  return `${formattedValue}${suffix}`;
};
