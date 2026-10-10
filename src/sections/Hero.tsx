import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { profile } from "../data/profile";
import { projects } from "../data/projects";
import { sound } from "../utils/sound";
import { Play, Plus, Info, Award, Code2, GraduationCap } from "lucide-react";

interface HeroProps {
  onPlay: () => void;
  onResume: () => void;
  profileId: string;
}

export const Hero: React.FC<HeroProps> = ({ onPlay, onResume, profileId }) => {
  const containerRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 45, damping: 20 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateY = useTransform(smoothMouseX, [-1, 1], [-6, 6]);
  const rotateX = useTransform(smoothMouseY, [-1, 1], [4, -4]);
  const portraitX = useTransform(smoothMouseX, [-1, 1], [-12, 12]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const handlePointerMove = (e: React.PointerEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX / rect.width) * 2 - 1;
    const y = (e.clientY / rect.height) * 2 - 1;
    mouseX.set(x);
    mouseY.set(y);
  };

  const scrollTo = (id: string) => {
    sound.playClick();
    const el = document.getElementById(id);
    if (el) {
      const offset = 70;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
      });
    }
  };

  return (
    <section
      id="top"
      ref={containerRef}
      onPointerMove={handlePointerMove}
      className="relative min-h-[100svh] overflow-hidden flex flex-col justify-end lg:justify-center select-none pt-20 pb-16 lg:py-0"
    >
      {/* Cinematic Ambient Spotlights */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute right-[-10%] top-[-10%] h-[95vh] w-[85vw] rounded-full bg-[radial-gradient(closest-side,rgba(229,19,43,0.36),rgba(229,19,43,0.08)_55%,transparent)] blur-3xl lg:right-[-4%] lg:w-[65vw]" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[75vh] w-[65vw] rounded-full bg-[radial-gradient(closest-side,rgba(110,20,150,0.22),transparent)] blur-3xl" />
      </div>

      {/* Floating Ambient Badges */}
      <div className="hidden xl:block absolute inset-0 pointer-events-none z-10">
        <motion.div
          className="absolute left-[6%] top-[32%] glass-card rounded-xl p-3 shadow-xl flex items-center gap-3 border border-white/10"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="h-9 w-9 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-bone">B.Tech CS (AI)</p>
            <p className="text-[10px] text-mist">AKTU Kanpur (2022–2026)</p>
          </div>
        </motion.div>

        <motion.div
          className="absolute right-[5%] top-[22%] glass-card rounded-xl p-3 shadow-xl flex items-center gap-3 border border-white/10"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="h-9 w-9 rounded-lg bg-red-500/20 flex items-center justify-center text-red-400">
            <Award className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-bone">5-Star Java Badge</p>
            <p className="text-[10px] text-mist">HackerRank Certified</p>
          </div>
        </motion.div>

        <motion.div
          className="absolute right-[8%] bottom-[24%] glass-card rounded-xl p-3 shadow-xl flex items-center gap-3 border border-white/10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <div className="h-9 w-9 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Code2 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-bone">350+ DSA Solved</p>
            <p className="text-[10px] text-mist">LeetCode &amp; HackerRank</p>
          </div>
        </motion.div>
      </div>

      {/* Hero Portrait Right Side (Desktop) / Top Center (Mobile) */}
      <motion.div
        className="relative lg:absolute inset-x-0 top-0 z-[2] flex h-[50svh] items-end justify-center sm:h-[58svh] lg:bottom-0 lg:left-auto lg:right-[3vw] lg:top-14 lg:h-auto lg:w-[54vw] xl:right-[5vw] xl:w-[48vw] pointer-events-none"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        <motion.div
          className="relative h-full w-full lg:h-[88vh] flex items-end justify-center"
          style={{
            rotateY,
            rotateX,
            x: portraitX,
            transformPerspective: 1200
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Portrait cutout image */}
          <img
            src={profile.portrait.src}
            srcSet={profile.portrait.srcSet}
            alt={profile.portrait.alt}
            className="h-full w-auto max-w-none object-contain object-bottom [mask-image:linear-gradient(to_bottom,black_65%,transparent_98%)] drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
          />

          {/* Vignette fade */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-ink via-ink/80 to-transparent" />
        </motion.div>
      </motion.div>

      {/* Hero Billboard Details Left Side */}
      <motion.div
        className="gutter relative z-10 max-w-3xl"
        style={{ opacity: heroOpacity }}
      >
        {/* Studio Kicker */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <span className="font-display text-2xl tracking-normal text-crimson-2">A</span>
          <span className="text-[11px] font-bold tracking-[0.36em] text-bone/90 uppercase">
            ORIGINAL SERIES
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="font-display tracking-tight text-bone leading-[0.82] mt-2 drop-shadow-[0_8px_30px_rgba(0,0,0,0.8)]"
          style={{ fontSize: "clamp(4.2rem, 13vw, 10.5rem)" }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {profile.firstName}
        </motion.h1>

        {/* Tagline & Subtitle */}
        <motion.p
          className="font-sans text-sm font-bold tracking-[0.4em] text-crimson-2 uppercase mt-1 sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {profile.role}
        </motion.p>

        {/* Streaming Metadata Row */}
        <motion.div
          className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs text-mist font-medium mt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <span className="flex items-center gap-1.5 rounded bg-crimson px-2 py-0.5 text-[11px] font-bold text-white uppercase tracking-wider">
            TOP 10
          </span>
          <span className="font-semibold text-[#46e3a8]">2022–2026</span>
          <span className="h-1 w-1 rounded-full bg-smoke" />
          <span className="rounded border border-white/30 px-1.5 py-0.2 text-[10px] font-bold text-bone">
            4K ULTRA HD
          </span>
          <span className="h-1 w-1 rounded-full bg-smoke" />
          <span>B.Tech CS (AI)</span>
          <span className="h-1 w-1 rounded-full bg-smoke" />
          <span>{projects.length} Originals</span>
        </motion.div>

        {/* Logline Bio */}
        <motion.p
          className="mt-4 max-w-xl text-sm leading-relaxed text-bone/85 sm:text-base font-light line-clamp-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {profile.intro}
        </motion.p>

        {/* Primary Billboard Buttons */}
        <motion.div
          className="mt-7 flex flex-wrap items-center gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onPlay();
            }}
            data-cursor="play"
            className="flex min-h-12 items-center gap-2.5 rounded-md bg-bone px-6 py-3 text-sm font-bold text-ink transition hover:bg-white hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.25)] sm:px-8"
          >
            <Play className="h-5 w-5 fill-ink" />
            Play Intro
          </button>

          <button
            type="button"
            onClick={() => scrollTo("originals")}
            data-cursor="view"
            className="glass flex min-h-12 items-center gap-2.5 rounded-md px-6 py-3 text-sm font-semibold text-bone transition hover:bg-white/15 sm:px-8"
          >
            <Plus className="h-5 w-5" />
            My Work
          </button>

          <button
            type="button"
            onClick={() => scrollTo("about")}
            data-cursor="view"
            className="glass hidden sm:flex h-12 w-12 items-center justify-center rounded-full text-bone transition hover:bg-white/15"
            aria-label="More Info about Aditya"
          >
            <Info className="h-5 w-5" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};
