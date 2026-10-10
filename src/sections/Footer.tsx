import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { profile } from "../data/profile";
import { sound } from "../utils/sound";
import { Mail, RotateCcw, ArrowUp, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../components/Icons";

interface FooterProps {
  onReplay: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onReplay }) => {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start 0.2"]
  });

  const letterSpacing = useTransform(scrollYProgress, [0, 1], ["0.4em", "0.02em"]);
  const titleOpacity = useTransform(scrollYProgress, [0.1, 0.9], [0.3, 1]);

  const socialLinks = [
    {
      label: "Let's Build",
      href: `mailto:${profile.email}?subject=${encodeURIComponent("Let's build something")}`,
      primary: true,
      icon: Send,
      cursor: "play"
    },
    {
      label: "LinkedIn",
      href: profile.links.linkedin,
      primary: false,
      icon: LinkedinIcon,
      cursor: "link"
    },
    {
      label: "GitHub",
      href: profile.links.github,
      primary: false,
      icon: GithubIcon,
      cursor: "link"
    },
    {
      label: "Email",
      href: `mailto:${profile.email}`,
      primary: false,
      icon: Mail,
      cursor: "link"
    }
  ];

  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      ref={containerRef}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 py-24 text-center select-none"
    >
      {/* Background Glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_60%,rgba(229,19,43,0.22),transparent_70%)] pointer-events-none"
      />

      {/* Kicker */}
      <motion.p
        className="relative mb-6 text-[11px] font-bold uppercase tracking-[0.5em] text-crimson-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        The Next Episode
      </motion.p>

      {/* Title */}
      <motion.h2
        className="relative font-display leading-[0.85] text-bone"
        style={{
          fontSize: "clamp(3.5rem, 13vw, 12rem)",
          letterSpacing,
          opacity: titleOpacity
        }}
      >
        TO BE CONTINUED…
      </motion.h2>

      {/* Identity Subtitle */}
      <motion.div
        className="relative mt-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <p className="font-sans text-2xl font-semibold tracking-[0.2em] text-bone sm:text-3xl uppercase">
          {profile.displayName}
        </p>
        <p className="mt-2 text-xs font-semibold tracking-[0.4em] text-mist sm:text-sm uppercase">
          {profile.role}
        </p>
      </motion.div>

      {/* Action Links */}
      <motion.div
        className="relative mt-10 flex flex-wrap justify-center gap-3 sm:gap-4 max-w-xl"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } } }}
      >
        {socialLinks.map((item) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
              }}
            >
              <a
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                data-cursor={item.cursor}
                onClick={() => sound.playClick()}
                className={`flex min-h-12 items-center gap-2.5 rounded-full px-7 text-xs font-bold tracking-[0.14em] uppercase transition hover:scale-105 ${
                  item.primary
                    ? "bg-crimson text-white shadow-[0_0_50px_rgba(229,19,43,0.55)] hover:bg-crimson-2"
                    : "border border-white/20 text-bone hover:border-white hover:bg-white/10"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </a>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Replay Intro & Scroll Top Actions */}
      <div className="relative mt-16 flex items-center gap-4">
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onReplay();
          }}
          className="flex items-center gap-2 rounded-full bg-white/5 border border-white/15 px-4 py-2 text-xs font-medium text-mist hover:text-bone hover:bg-white/10 transition"
        >
          <RotateCcw className="h-3.5 w-3.5 text-crimson-2" />
          Replay Series Intro
        </button>

        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/15 text-mist hover:text-bone hover:bg-white/10 transition"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </div>

      {/* Copyright & Production Credits */}
      <div className="relative mt-12 text-xs text-smoke font-light tracking-wide">
        <p>© 2026 Aditya Sharma • A Streaming Platform Experience</p>
        <p className="mt-1 text-[11px] text-smoke/70">
          Engineered with React, TypeScript &amp; Tailwind CSS • Deployed on Vercel
        </p>
      </div>
    </footer>
  );
};
