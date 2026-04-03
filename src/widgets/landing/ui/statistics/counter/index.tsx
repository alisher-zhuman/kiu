"use client";

import { useCountUp } from "@/shared/hooks";

interface Props {
  locale: string;
  start: boolean;
  value: string;
}

export const StatisticsCounter = ({ locale, start, value }: Props) => {
  const animatedValue = useCountUp({
    locale,
    start,
    target: value,
  });

  return <h3 className="text-6xl font-bold">{animatedValue}</h3>;
};
