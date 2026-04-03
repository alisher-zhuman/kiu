"use client";

import { type ReactNode, useEffect, useState } from "react";

import { cn } from "@/shared/helpers";

interface Props {
  children: ReactNode;
}

export const PageRevealFrame = ({ children }: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let frameId = 0;

    frameId = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setIsVisible(true);
      });
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div
      className={cn(
        "transition-all duration-500 ease-out motion-reduce:transform-none motion-reduce:transition-none",
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-4 opacity-0 motion-reduce:opacity-100",
      )}
    >
      {children}
    </div>
  );
};
