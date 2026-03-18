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
    <section className="relative w-full">
      <video
        ref={videoRef}
        autoPlay
        muted={isMuted}
        loop
        playsInline
        preload="metadata"
        className="block h-auto w-full max-w-400 m-auto"
      >
        <source src="/videos/intro.mp4" type="video/mp4" />
      </video>

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
    </section>
  );
};
