"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Play, Volume2, VolumeX } from "lucide-react";

import { cn } from "@/shared/helpers";
import { usePrefersReducedMotion } from "@/shared/hooks";

const DESKTOP_MEDIA_QUERY = "(min-width: 768px)";

export const Intro = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  const t = useTranslations("Intro");

  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);

    const autoplayOnDesktop = () => {
      if (mediaQuery.matches && !prefersReducedMotion) {
        videoRef.current?.play().catch(() => null);
      } else {
        videoRef.current?.pause();
      }
    };

    autoplayOnDesktop();
    mediaQuery.addEventListener("change", autoplayOnDesktop);

    return () => mediaQuery.removeEventListener("change", autoplayOnDesktop);
  }, [prefersReducedMotion]);

  const handlePlayClick = () => {
    videoRef.current?.play().catch(() => null);
  };

  const handleSoundToggle = async () => {
    const nextMuted = !isMuted;

    setIsMuted(nextMuted);

    if (!videoRef.current) {
      return;
    }

    videoRef.current.muted = nextMuted;

    if (!nextMuted) {
      await videoRef.current.play().catch(() => null);
    }
  };

  return (
    <section className="w-full">
      <div className="relative max-w-400 m-auto">
        <div className="relative overflow-hidden">
          {isPlaying && !isVideoReady ? (
            <div className="pointer-events-none absolute inset-x-5 top-5 z-20 md:inset-x-8 md:top-8">
              <p className="inline-flex max-w-full rounded-full bg-white/88 px-4 py-2 text-sm font-medium text-[#003B75] shadow-[0_10px_30px_rgba(0,0,0,0.08)] backdrop-blur-sm md:text-base">
                {t("loading")}
              </p>
            </div>
          ) : null}

          <div
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-0 z-10 bg-black/8 transition-opacity duration-300",
              isVideoReady && "opacity-0"
            )}
          />

          {!isPlaying && (
            <button
              type="button"
              aria-label={t("play")}
              onClick={handlePlayClick}
              className="group absolute inset-0 z-20 flex items-center justify-center"
            >
              <span className="inline-flex items-center justify-center rounded-full bg-white/88 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.15)] backdrop-blur-sm transition-transform duration-200 group-hover:scale-105">
                <Play
                  size={28}
                  strokeWidth={1.75}
                  fill="currentColor"
                  className="translate-x-0.5 text-[#004C97]"
                />
              </span>
            </button>
          )}

          <video
            ref={videoRef}
            muted={isMuted}
            loop
            playsInline
            poster="/images/intro-poster.webp"
            preload="metadata"
            onLoadedData={() => setIsVideoReady(true)}
            onPlaying={() => setIsVideoReady(true)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            className={cn(
              "block aspect-video w-full bg-black/8 object-cover transition-opacity duration-300",
              isVideoReady ? "opacity-100" : "opacity-100"
            )}
          >
            <source src="/videos/intro.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden pr-14 pb-14 md:block">
          <div className="relative inline-flex bg-[#004C97] px-6 py-4 lg:px-8 lg:py-6">
            <p className="max-w-5xl text-4xl leading-tight font-bold text-white lg:text-6xl">
              {t("quote")}
            </p>

            <div className="absolute top-0 -right-8.5 h-full w-16 origin-left -skew-x-12 bg-[#004C97]" />
          </div>
        </div>

        {isVideoReady && (
          <button
            type="button"
            aria-label={isMuted ? t("unmute") : t("mute")}
            onClick={handleSoundToggle}
            className="group absolute right-4 bottom-4 inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#004C97]/90 px-4 py-2 text-sm font-medium text-white shadow-2xl backdrop-blur-sm transition-all duration-200 hover:-translate-y-px hover:bg-[#004C97]"
          >
            {isMuted ? (
              <VolumeX
                size={18}
                strokeWidth={1.75}
                className="transition-transform duration-200 group-hover:scale-105"
              />
            ) : (
              <Volume2
                size={18}
                strokeWidth={1.75}
                className="transition-transform duration-200 group-hover:scale-105"
              />
            )}

            <span>{isMuted ? t("unmute") : t("mute")}</span>
          </button>
        )}
      </div>

      <div className="pr-16 md:hidden">
        <div className="relative inline-flex bg-[#004C97] pl-5 py-5">
          <p className="text-3xl relative z-20 leading-tight font-bold text-white">{t("quote")}</p>

          <div className="absolute z-10 top-0 -right-6 h-full w-16 origin-left -skew-x-12 bg-[#004C97]" />
        </div>
      </div>
    </section>
  );
};
