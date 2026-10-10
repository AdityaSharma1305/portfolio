import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { profile } from "../data/profile";
import { storyReelItems } from "../data/projects";
import { sound } from "../utils/sound";

const SLIDE_DURATION = 3800; // ms per slide

export const PlayIntro: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [phase, setPhase] = useState<"zoom" | "reel" | "end">("zoom");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const progress = useMotionValue(0);

  // Initial cinematic portrait zoom
  useEffect(() => {
    sound.playTudum();
    const timer = setTimeout(() => {
      setPhase("reel");
    }, 1700);
    return () => clearTimeout(timer);
  }, []);

  const nextSlide = useCallback(() => {
    sound.playWhoosh();
    setCurrentIndex((prev) => {
      if (prev >= storyReelItems.length - 1) {
        setPhase("end");
        return prev;
      }
      return prev + 1;
    });
    progress.set(0);
  }, [progress]);

  const prevSlide = useCallback(() => {
    sound.playWhoosh();
    setCurrentIndex((prev) => Math.max(0, prev - 1));
    progress.set(0);
  }, [progress]);

  // Autoplay progression for reel
  useEffect(() => {
    if (phase !== "reel" || isPaused) return;

    let animId = 0;
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const delta = currentTime - lastTime;
      lastTime = currentTime;
      const currentVal = progress.get() + delta / SLIDE_DURATION;

      if (currentVal >= 1) {
        nextSlide();
        return;
      }

      progress.set(currentVal);
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [phase, isPaused, currentIndex, nextSlide, progress]);

  // End screen auto close
  useEffect(() => {
    if (phase !== "end") return;
    const timer = setTimeout(onClose, 2200);
    return () => clearTimeout(timer);
  }, [phase, onClose]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === " ") {
        e.preventDefault();
        setIsPaused((p) => !p);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, nextSlide, prevSlide]);

  const item = storyReelItems[currentIndex];

  return (
    <motion.div
      className="fixed inset-0 z-[130] overflow-hidden bg-black select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 0.6 }}
      role="dialog"
      aria-modal="true"
      aria-label="Series Highlight Reel"
    >
      {/* Background Portrait with cinematic lighting */}
      <motion.div
        className="absolute inset-0 flex items-end justify-center"
        initial={{ scale: 1, opacity: 1 }}
        animate={
          phase === "zoom"
            ? { scale: [1, 1.08, 2.6], opacity: [0.9, 1, 0] }
            : { opacity: 0.15, scale: 1.25, filter: "blur(6px)" }
        }
        transition={{
          duration: phase === "zoom" ? 1.7 : 1.2,
          ease: [0.7, 0, 0.2, 1],
          times: phase === "zoom" ? [0, 0.3, 1] : undefined
        }}
        style={{ transformOrigin: "50% 30%" }}
      >
        <img
          src={profile.portrait.src}
          srcSet={profile.portrait.srcSet}
          alt={profile.portrait.alt}
          className="h-[88vh] w-auto max-w-none object-contain [mask-image:linear-gradient(to_bottom,black_60%,transparent)]"
        />
      </motion.div>

      {/* Crimson Ambient Glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_45%,rgba(180,10,25,0.4),transparent_70%)] pointer-events-none"
      />

      {/* Progress Bars */}
      {phase !== "zoom" && (
        <div className="absolute inset-x-0 top-0 z-20 flex gap-1.5 px-4 pt-4 sm:px-10 sm:pt-6">
          {storyReelItems.map((s, idx) => (
            <div key={s.kicker} className="h-[3px] flex-1 overflow-hidden rounded bg-white/20">
              <motion.div
                className="h-full origin-left bg-bone"
                style={{
                  scaleX: idx === currentIndex && phase === "reel" ? progress : idx < currentIndex || phase === "end" ? 1 : 0
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Story Slide Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-6 text-center pointer-events-none">
        <AnimatePresence mode="wait">
          {phase === "reel" && item && (
            <motion.div
              key={currentIndex}
              className="max-w-4xl"
              initial={{ opacity: 0, scale: 1.06, filter: "blur(14px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.96, filter: "blur(10px)" }}
              transition={{ duration: 0.6 }}
            >
              <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.5em] text-crimson-2 sm:text-sm">
                Episode {String(currentIndex + 1).padStart(2, "0")} • {item.kicker}
              </p>
              <h2
                className="font-display leading-[0.88] text-bone"
                style={{ fontSize: "clamp(3.2rem, 10vw, 8.5rem)" }}
              >
                {item.title}
              </h2>
              <div className="mt-6 space-y-2">
                {item.lines.map((line, lIdx) => (
                  <motion.p
                    key={line}
                    className="text-base text-bone/85 sm:text-xl font-light"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + lIdx * 0.1, duration: 0.5 }}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>
              {item.chips && (
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {item.chips.map((chip, cIdx) => (
                    <motion.span
                      key={chip}
                      className="glass rounded-full px-3 py-1 text-xs font-semibold tracking-wide text-bone"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + cIdx * 0.05 }}
                    >
                      {chip}
                    </motion.span>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {phase === "end" && (
            <motion.div
              key="end"
              initial={{ opacity: 0, letterSpacing: "0.6em" }}
              animate={{ opacity: 1, letterSpacing: "0.2em" }}
              transition={{ duration: 1.2 }}
            >
              <p className="font-display text-5xl text-bone sm:text-7xl">NOW STREAMING</p>
              <p className="mt-3 text-xs font-semibold tracking-[0.4em] text-mist">
                {profile.displayName.toUpperCase()}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Tap Left / Right targets for touch/click */}
      {phase === "reel" && (
        <>
          <button
            type="button"
            aria-label="Previous highlight"
            className="absolute inset-y-0 left-0 z-[5] w-1/4 cursor-pointer focus:outline-none"
            onClick={prevSlide}
          />
          <button
            type="button"
            aria-label="Next highlight"
            data-cursor="play"
            className="absolute inset-y-0 right-0 z-[5] w-1/4 cursor-pointer focus:outline-none"
            onClick={nextSlide}
          />
        </>
      )}

      {/* Bottom Bar Controls */}
      <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-10 sm:pb-8">
        <div className="flex items-center gap-2">
          {phase === "reel" && (
            <button
              type="button"
              onClick={() => setIsPaused((p) => !p)}
              aria-label={isPaused ? "Resume" : "Pause"}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-bone transition hover:bg-white/10"
            >
              {isPaused ? "▶" : "❚❚"}
            </button>
          )}
          <span className="hidden text-[11px] tracking-[0.2em] text-smoke sm:block">
            SPACE • ◄ ► • ESC
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          data-cursor="close"
          className="rounded-full bg-bone px-5 py-2.5 text-xs font-bold tracking-[0.18em] text-ink transition hover:bg-white"
        >
          BACK TO BROWSE
        </button>
      </div>
    </motion.div>
  );
};
