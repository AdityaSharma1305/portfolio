import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { profile } from "../data/profile";
import { sound } from "../utils/sound";
import {
  Mail,
  RotateCcw,
  ArrowUp,
  Send,
  Phone,
  MapPin,
  Copy,
  Check,
  ExternalLink
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../components/Icons";

interface FooterProps {
  onReplay: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onReplay }) => {
  const containerRef = useRef<HTMLElement>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start 0.2"]
  });

  const letterSpacing = useTransform(scrollYProgress, [0, 1], ["0.4em", "0.02em"]);
  const titleOpacity = useTransform(scrollYProgress, [0.1, 0.9], [0.3, 1]);

  const copyToClipboard = (text: string, key: string) => {
    sound.playClick();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2200);
  };

  const contactCards = [
    {
      key: "email",
      label: "Email Direct",
      value: profile.email,
      subtext: "Best for opportunities & technical inquiries",
      icon: Mail,
      href: `mailto:${profile.email}`,
      actionType: "mail",
      canCopy: true
    },
    {
      key: "phone",
      label: "Direct Phone",
      value: profile.phone,
      subtext: "Call / WhatsApp (IST Timezone)",
      icon: Phone,
      href: `tel:${profile.phone.replace(/\s+/g, "")}`,
      actionType: "call",
      canCopy: true
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      value: "adityasharma1305",
      subtext: "Professional network & messaging",
      icon: LinkedinIcon,
      href: profile.links.linkedin,
      actionType: "link",
      canCopy: false
    },
    {
      key: "github",
      label: "GitHub",
      value: "AdityaSharma1305",
      subtext: "Repositories, commits & codebases",
      icon: GithubIcon,
      href: profile.links.github,
      actionType: "link",
      canCopy: false
    },
    {
      key: "location",
      label: "Current Location",
      value: profile.location,
      subtext: "Open to In-Office, Hybrid & Remote opportunities",
      icon: MapPin,
      href: "https://maps.google.com/?q=Gurugram,+Haryana,+India",
      actionType: "map",
      canCopy: false
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
        Season Finale • Direct Line
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
        className="relative mt-8 max-w-2xl text-center"
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
        <p className="mt-4 text-sm text-smoke font-light leading-relaxed">
          Ready to engineer high-performance backends, clean modern frontends, and reliable software. Reach out directly via phone, email, or social profiles below.
        </p>
      </motion.div>

      {/* Primary Streaming CTA */}
      <motion.div
        className="relative mt-8"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <a
          href={`mailto:${profile.email}?subject=${encodeURIComponent("Inquiry for Aditya Sharma • Full-Stack Developer")}`}
          data-cursor="play"
          onClick={() => sound.playClick()}
          className="inline-flex min-h-13 items-center gap-3 rounded-full bg-crimson px-8 py-3.5 text-sm font-bold tracking-[0.14em] uppercase text-white shadow-[0_0_50px_rgba(229,19,43,0.6)] transition hover:bg-crimson-2 hover:scale-105 active:scale-95"
        >
          <Send className="h-4 w-4" />
          Start a Conversation
        </a>
      </motion.div>

      {/* Detailed Contact Cards Grid */}
      <motion.div
        className="relative mt-12 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 text-left"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.25 } } }}
      >
        {contactCards.map((card) => {
          const Icon = card.icon;
          const isCopied = copiedKey === card.key;

          return (
            <motion.div
              key={card.key}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0 }
              }}
              className="group relative flex flex-col justify-between rounded-xl border border-white/10 bg-ink-2/80 p-5 backdrop-blur-md transition-all hover:border-crimson/50 hover:bg-ink-2 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-mist">
                    <Icon className="h-3.5 w-3.5 text-crimson-2" />
                    {card.label}
                  </span>
                  {card.canCopy && (
                    <button
                      type="button"
                      onClick={() => copyToClipboard(card.value, card.key)}
                      title="Copy to clipboard"
                      className="rounded-md border border-white/10 p-1 text-smoke transition hover:border-white/30 hover:text-bone hover:bg-white/5"
                    >
                      {isCopied ? (
                        <Check className="h-3 w-3 text-emerald-400" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </button>
                  )}
                </div>

                <a
                  href={card.href}
                  target={card.href.startsWith("http") ? "_blank" : undefined}
                  rel={card.href.startsWith("http") ? "noreferrer" : undefined}
                  onClick={() => sound.playClick()}
                  className="mt-3 block font-mono text-sm font-semibold text-bone hover:text-crimson-2 transition break-all"
                >
                  {card.value}
                </a>

                <p className="mt-1 text-xs text-smoke font-light leading-snug">
                  {card.subtext}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-medium text-smoke group-hover:text-mist">
                <a
                  href={card.href}
                  target={card.href.startsWith("http") ? "_blank" : undefined}
                  rel={card.href.startsWith("http") ? "noreferrer" : undefined}
                  onClick={() => sound.playClick()}
                  className="inline-flex items-center gap-1.5 hover:text-crimson-2 transition"
                >
                  <span>Connect</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
                {isCopied && (
                  <span className="text-[10px] font-semibold text-emerald-400 tracking-wider uppercase">
                    Copied!
                  </span>
                )}
              </div>
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
          className="flex items-center gap-2 rounded-full bg-white/5 border border-white/15 px-5 py-2.5 text-xs font-medium text-mist hover:text-bone hover:bg-white/10 transition"
        >
          <RotateCcw className="h-3.5 w-3.5 text-crimson-2" />
          Replay Series Intro
        </button>

        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/15 text-mist hover:text-bone hover:bg-white/10 transition"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </div>

      {/* Copyright & Production Credits */}
      <div className="relative mt-12 text-xs text-smoke font-light tracking-wide">
        <p>© 2026 Aditya Sharma • A Streaming Platform Experience</p>
        <p className="mt-1 text-[11px] text-smoke/70">
          Gurugram, Haryana • adityapersharma@gmail.com • +91 9675443277
        </p>
        <p className="mt-0.5 text-[10px] text-smoke/50">
          Engineered with React, TypeScript &amp; Tailwind CSS • Deployed on Vercel
        </p>
      </div>
    </footer>
  );
};

