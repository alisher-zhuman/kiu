"use client";

import { useEffect, useRef, useState } from "react";

import { usePrefersReducedMotion } from "./use-prefers-reduced-motion";

interface Options {
  once?: boolean;
  rootMargin?: string;
  threshold?: number;
}

const checkIntersectionObserverSupport = () => {
  if (typeof window === "undefined") {
    return true;
  }

  return "IntersectionObserver" in window;
};

export const useInView = <T extends HTMLElement>({
  once = true,
  rootMargin = "0px 0px -10% 0px",
  threshold = 0.2,
}: Options = {}) => {
  const [isInView, setIsInView] = useState(false);

  const ref = useRef<T | null>(null);

  const prefersReducedMotion = usePrefersReducedMotion();
  const supportsIntersectionObserver = checkIntersectionObserverSupport();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const element = ref.current;

    if (!element) {
      return;
    }

    if (!supportsIntersectionObserver) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (!entry) {
          return;
        }

        if (entry.isIntersecting) {
          setIsInView(true);

          if (once) {
            observer.unobserve(element);
          }

          return;
        }

        if (!once) {
          setIsInView(false);
        }
      },
      {
        rootMargin,
        threshold,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [
    once,
    prefersReducedMotion,
    rootMargin,
    supportsIntersectionObserver,
    threshold,
  ]);

  return {
    ref,
    isInView: prefersReducedMotion || !supportsIntersectionObserver || isInView,
  };
};
