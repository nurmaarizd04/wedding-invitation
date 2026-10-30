"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { wedding } from "@/data/wedding";
import { createMusic, type MusicController } from "@/lib/music";
import BottomNav from "./BottomNav";
import Cover from "./Cover";
import { MusicIcon, PauseIcon } from "./icons";

export default function InvitationShell({ children }: { children: ReactNode }) {
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const musicRef = useRef<MusicController | null>(null);
  const { music } = wedding;

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  useEffect(() => {
    if (!music || !playerContainerRef.current) return;
    const controller = createMusic(music, playerContainerRef.current, setPlaying);
    musicRef.current = controller;
    return () => {
      controller.destroy();
      musicRef.current = null;
    };
  }, [music]);

  const openInvitation = () => {
    setOpened(true);
    window.scrollTo({ top: 0 });
    musicRef.current?.play();
  };

  const toggleMusic = () => {
    if (playing) musicRef.current?.pause();
    else musicRef.current?.play();
  };

  return (
    <>
      <Cover opened={opened} onOpen={openInvitation} />

      {children}

      <BottomNav visible={opened} />

      {music && (
        <>
          {/* Wadah player YouTube (tidak terlihat) */}
          <div
            ref={playerContainerRef}
            aria-hidden="true"
            className="pointer-events-none fixed bottom-0 left-0 -z-10 h-[200px] w-[200px] overflow-hidden opacity-0"
          />
          <button
            type="button"
            onClick={toggleMusic}
            aria-label={playing ? "Matikan musik" : "Putar musik"}
            className={`fixed bottom-20 right-4 z-40 grid h-11 w-11 place-items-center rounded-full border border-white/40 bg-gold/90 text-white shadow-lg backdrop-blur transition hover:bg-gold-dark ${
              opened ? "opacity-100" : "pointer-events-none opacity-0"
            } ${playing ? "animate-[spin_5s_linear_infinite]" : ""}`}
          >
            {playing ? <MusicIcon /> : <PauseIcon />}
          </button>
        </>
      )}
    </>
  );
}
