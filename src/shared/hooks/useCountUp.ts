"use client";

import { useEffect, useMemo, useState } from "react";

import { formatCount, getCounterMeta } from "@/shared/helpers";

import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

interface Options {
  duration?: number;
  locale: string;
  start: boolean;
  target: string;
}

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
