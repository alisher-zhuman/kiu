"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Volume2, VolumeX } from "lucide-react";

export const Intro = () => {
  const [isMuted, setIsMuted] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);

  const t = useTranslations("Intro");

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
        <video
          ref={videoRef}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          preload="metadata"
          className="block h-auto w-full"
        >
          <source src="/videos/intro.mp4" type="video/mp4" />
        </video>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden px-6 pb-8 md:block lg:px-8 lg:pb-10">
          <div className="relative inline-flex bg-[#004C97] px-8 py-6">
            <p className="max-w-5xl text-5xl leading-tight font-bold text-white lg:text-6xl">
              {t("quote")}
            </p>

            <div className="absolute top-0 -right-10 h-full w-16 origin-left -skew-x-12 bg-[#004C97]" />
          </div>
        </div>

        <button
          type="button"
          aria-label={isMuted ? t("unmute") : t("mute")}
          onClick={handleSoundToggle}
          className="absolute right-4 bottom-4 inline-flex items-center gap-2 rounded-full bg-[#004C97]/90 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-[#004C97]"
        >
          {isMuted ? (
            <VolumeX size={18} strokeWidth={1.75} />
          ) : (
            <Volume2 size={18} strokeWidth={1.75} />
          )}

          <span>{isMuted ? t("unmute") : t("mute")}</span>
        </button>
      </div>

      <div className="max-w-400 m-auto px-5 py-5 md:hidden">
        <div className="relative inline-flex bg-[#004C97] px-5 py-5">
          <p className="text-3xl leading-tight font-bold text-white">
            {t("quote")}
          </p>

          <div className="absolute top-0 -right-6 h-full w-10 origin-left -skew-x-12 bg-[#004C97]" />
        </div>
      </div>
    </section>
  );
};
