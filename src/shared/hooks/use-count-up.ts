"use client";

import { useEffect, useMemo, useState } from "react";

import { usePrefersReducedMotion } from "./use-prefers-reduced-motion";

interface Options {
  duration?: number;
  locale: string;
  start: boolean;
  target: string;
}

interface CounterMeta {
  hasGrouping: boolean;
  suffix: string;
  targetValue: number;
  usesSpaceGrouping: boolean;
}

const getCounterMeta = (target: string): CounterMeta => {
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

const formatCount = (
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

export const useCountUp = ({
  duration = 1400,
  locale,
  start,
  target,
}: Options) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  const counterMeta = useMemo(() => getCounterMeta(target), [target]);

  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!start || prefersReducedMotion) {
      return;
    }

    let frameId = 0;
    const startTime = performance.now();

    const updateValue = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = 1 - (1 - progress) ** 3;
      const currentValue = counterMeta.targetValue * easedProgress;

      setAnimatedValue(currentValue);

      if (progress < 1) {
        frameId = window.requestAnimationFrame(updateValue);
      }
    };

    frameId = window.requestAnimationFrame(updateValue);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [counterMeta.targetValue, duration, prefersReducedMotion, start]);

  if (!start) {
    return formatCount(0, locale, counterMeta);
  }

  if (prefersReducedMotion) {
    return formatCount(counterMeta.targetValue, locale, counterMeta);
  }

  return formatCount(animatedValue, locale, counterMeta);
};
