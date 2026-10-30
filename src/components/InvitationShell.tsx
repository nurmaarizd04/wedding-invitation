"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Lenis from "lenis";
import { wedding } from "@/data/wedding";
import { createMusic, type MusicController } from "@/lib/music";
import BottomNav from "./BottomNav";
import Cover from "./Cover";
import OpeningBurst from "./OpeningBurst";
import { MusicIcon, PauseIcon } from "./icons";

/** Lama animasi pembuka; setelah itu cover dimatikan total agar tidak membebani scroll. */
const OPENING_DURATION = 2600;

export default function InvitationShell({ children }: { children: ReactNode }) {
  const [opened, setOpened] = useState(false);
  const [coverDone, setCoverDone] = useState(false);
  const [showBurst, setShowBurst] = useState(false);
  const [playing, setPlaying] = useState(false);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const musicRef = useRef<MusicController | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const { music, musicBoost } = wedding;

  // Smooth scroll (terutama untuk roda mouse), dikunci sampai undangan dibuka
  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true, anchors: true, lerp: 0.09 });
    lenis.stop();
    lenisRef.current = lenis;
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  useEffect(() => {
    if (!music || !playerContainerRef.current) return;
    const controller = createMusic(music, playerContainerRef.current, setPlaying, musicBoost);
    musicRef.current = controller;
    return () => {
      controller.destroy();
      musicRef.current = null;
    };
  }, [music, musicBoost]);

  const openInvitation = () => {
    setOpened(true);
    setShowBurst(true);
    setTimeout(() => setShowBurst(false), 3000);
    setTimeout(() => setCoverDone(true), OPENING_DURATION);
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
    lenisRef.current?.start();
    musicRef.current?.play();
  };

  const toggleMusic = () => {
    if (playing) musicRef.current?.pause();
    else musicRef.current?.play();
  };

  return (
    <>
      <Cover opened={opened} done={coverDone} onOpen={openInvitation} />
      {/* data-opened mengaktifkan class `opened:` untuk animasi pembuka */}
      <div data-opened={opened}>{children}</div>

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
            className={`fixed bottom-20 right-4 z-40 grid h-11 w-11 place-items-center rounded-full border border-white/40 bg-gold/90 text-white shadow-lg transition hover:bg-gold-dark ${
              opened ? "opacity-100" : "pointer-events-none opacity-0"
            } ${playing ? "animate-[spin_5s_linear_infinite]" : ""}`}
          >
            {playing ? <MusicIcon /> : <PauseIcon />}
          </button>
        </>
      )}

      <OpeningBurst active={showBurst} />
    </>
  );
}
