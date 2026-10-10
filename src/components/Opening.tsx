import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "../data/profile";
import { sound } from "../utils/sound";

interface OpeningProps {
  onDone: () => void;
}

const beats = [
  { at: 300, beat: 1 },
  { at: 1800, beat: 2 },
  { at: 2600, beat: 3 },
  { at: 3300, beat: 4 },
  { at: 4200, beat: 5 },
  { at: 5000, beat: 6 }
];

export const Opening: React.FC<OpeningProps> = ({ onDone }) => {
  const [currentBeat, setCurrentBeat] = useState<number>(0);

  useEffect(() => {
    sound.playTudum();

    const timers = beats.map(({ at, beat }) =>
      window.setTimeout(() => {
        setCurrentBeat(beat);
        if (beat === 2) sound.playWhoosh();
      }, at)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter") {
        onDone();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[120] overflow-hidden bg-black select-none"
      exit={{ opacity: 0, scale: 1.04, filter: "blur(12px)" }}
      transition={{ duration: 0.9 }}
      role="dialog"
      aria-label="Opening titles"
    >
      {/* Top and Bottom Letterbox Bars */}
      <motion.div
        className="absolute inset-x-0 top-0 z-30 h-[7vh] bg-black"
        initial={{ y: 0 }}
        animate={{ y: currentBeat >= 6 ? "-100%" : 0 }}
        transition={{ duration: 1.2 }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 z-30 h-[7vh] bg-black"
        initial={{ y: 0 }}
        animate={{ y: currentBeat >= 6 ? "100%" : 0 }}
        transition={{ duration: 1.2 }}
      />

      {/* Ambient Crimson Center Light */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(60% 50% at 50% 55%, rgba(229, 19, 43, 0.25), transparent 70%)"
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: currentBeat >= 2 ? [0, 0.9, 0.5, 1] : 0 }}
        transition={{ duration: 1.4 }}
      />

      {/* Beat 1: Studio Kicker */}
      <AnimatePresence>
        {currentBeat === 1 && (
          <motion.div
            key="studio"
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 0.6 }}
          >
            <motion.p
              className="font-sans text-xs font-semibold text-mist sm:text-sm tracking-[0.2em]"
              initial={{ letterSpacing: "0.2em", opacity: 0 }}
              animate={{ letterSpacing: "0.6em", opacity: 1 }}
              transition={{ duration: 1.5 }}
            >
              {profile.originalLabel}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Beat 4: Rising Portrait Silhouette */}
      <motion.div
        className="absolute inset-x-0 bottom-0 z-0 mx-auto flex h-[70vh] max-w-[900px] items-end justify-center pointer-events-none"
        initial={{ opacity: 0, scale: 1.12, filter: "blur(18px) brightness(0.3)" }}
        animate={
          currentBeat >= 4
            ? { opacity: 1, scale: 1, filter: "blur(0px) brightness(1)" }
            : {}
        }
        transition={{ duration: 1.6 }}
      >
        <img
          src={profile.portrait.src}
          srcSet={profile.portrait.srcSet}
          sizes="(max-width: 768px) 100vw, 900px"
          alt={profile.portrait.alt}
          className="h-full w-auto max-w-none object-contain object-bottom [mask-image:linear-gradient(to_bottom,black_55%,transparent_98%)]"
        />
      </motion.div>

      {/* Vignette Gradient Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] bg-[radial-gradient(70%_60%_at_50%_40%,transparent_30%,rgba(0,0,0,0.85)_100%)] pointer-events-none"
      />

      {/* Beat 2 & 3: Giant Cinematic Title */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center pointer-events-none">
        <motion.h1
          className="font-display leading-[0.82] text-bone drop-shadow-[0_8px_40px_rgba(0,0,0,0.9)]"
          style={{ fontSize: "clamp(4.6rem, 20vw, 15rem)" }}
          initial={{ opacity: 0, scale: 1.3, filter: "blur(20px)", letterSpacing: "0.5em" }}
          animate={
            currentBeat >= 2
              ? {
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                  letterSpacing: "0.04em",
                  y: currentBeat >= 4 ? "-30vh" : 0
                }
              : {}
          }
          transition={{ duration: 1.3 }}
        >
          {profile.firstName}
        </motion.h1>

        <motion.p
          className="font-sans text-sm font-bold text-crimson-2 [text-shadow:0_2px_20px_rgba(0,0,0,0.9)] sm:text-lg"
          initial={{ opacity: 0, letterSpacing: "1.4em" }}
          animate={
            currentBeat >= 3
              ? {
                  opacity: 1,
                  letterSpacing: "0.7em",
                  y: currentBeat >= 4 ? "-30vh" : 0
                }
              : {}
          }
          transition={{ duration: 1.1 }}
        >
          {profile.seriesTag}
        </motion.p>
      </div>

      {/* Beat 5 & 6: Tagline and Play Action */}
      <div className="absolute inset-x-0 bottom-[9vh] z-20 flex flex-col items-center gap-6 px-4 text-center">
        <motion.p
          className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-bone/90 sm:text-sm sm:tracking-[0.4em]"
          initial={{ opacity: 0, y: 14 }}
          animate={currentBeat >= 5 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {profile.tagline.join("  •  ")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={currentBeat >= 6 ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7 }}
        >
          <button
            type="button"
            data-cursor="play"
            onClick={() => {
              sound.playClick();
              onDone();
            }}
            tabIndex={currentBeat >= 6 ? 0 : -1}
            className="group flex items-center gap-3 rounded-full bg-bone px-9 py-4 font-sans text-base font-bold tracking-wide text-ink shadow-[0_0_60px_rgba(229,19,43,0.55)] transition hover:bg-white hover:scale-105"
          >
            <span className="text-lg transition-transform group-hover:scale-125 text-crimson">
              ▶
            </span>
            PLAY
          </button>
        </motion.div>
      </div>

      {/* Skip Intro Button */}
      <button
        type="button"
        onClick={() => {
          sound.playClick();
          onDone();
        }}
        className="absolute right-4 top-[calc(7vh+14px)] z-40 rounded-full border border-white/20 px-4 py-2 font-sans text-[11px] font-semibold tracking-[0.2em] text-mist transition hover:border-white/60 hover:text-bone"
      >
        SKIP INTRO
      </button>
    </motion.div>
  );
};
