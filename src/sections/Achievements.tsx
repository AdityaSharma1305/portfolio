import React from "react";
import { motion } from "framer-motion";
import { achievementsList, AchievementItem } from "../data/profile";
import { SectionHeader } from "../components/SectionHeader";
import { ExternalLink, Award } from "lucide-react";

export const LaurelWreath: React.FC<{ side: "l" | "r" }> = ({ side }) => {
  return (
    <svg
      viewBox="0 0 30 64"
      className={`h-12 w-auto text-[#d9b46a] ${side === "r" ? "-scale-x-100" : ""}`}
      aria-hidden="true"
    >
      <path
        d="M26 62C10 52 4 36 8 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      {[10, 18, 26, 34, 42, 50].map((y, idx) => (
        <ellipse
          key={y}
          cx={idx < 2 ? 9 : 8 + idx * 1.6}
          cy={y}
          rx="5"
          ry="2.2"
          fill="currentColor"
          opacity="0.85"
          transform={`rotate(-40 ${8 + idx * 1.6} ${y})`}
        />
      ))}
    </svg>
  );
};

export const Achievements: React.FC = () => {
  return (
    <section id="moments" className="py-16 md:py-24 select-none">
      <SectionHeader
        kicker="Awards Season"
        title="Hall of Fame"
        aside={
          <p className="max-w-xs text-sm text-mist font-light">
            Verified competitive programming badges and technical certifications.
          </p>
        }
      />

      {/* Cards Grid */}
      <div className="gutter grid gap-6 sm:grid-cols-2 lg:grid-cols-4 [perspective:1400px]">
        {achievementsList.map((ach, idx) => (
          <motion.article
            key={ach.id}
            initial={{ opacity: 0, y: 40, rotateX: 12 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.8, delay: idx * 0.08 }}
            className="group relative flex min-h-[340px] flex-col items-center overflow-hidden rounded-2xl bg-[radial-gradient(120%_80%_at_50%_0%,#2a1f10,#0d0b08_60%,#07070a)] px-5 pb-6 pt-8 text-center ring-1 ring-[#d9b46a]/25 transition duration-500 hover:ring-[#d9b46a]/70 hover:shadow-[0_20px_60px_rgba(217,180,106,0.15)] hover:-translate-y-2"
          >
            {/* Top Golden Light Line */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d9b46a]/80 to-transparent"
            />
            {/* Ambient Gold Glow */}
            <div
              aria-hidden="true"
              className="absolute -top-20 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-[#d9b46a]/10 blur-3xl transition duration-700 group-hover:bg-[#d9b46a]/25 pointer-events-none"
            />

            {/* Laurel Wreath Badge */}
            <div className="relative flex items-center gap-1">
              <LaurelWreath side="l" />
              <div className="px-1 text-center">
                <span className="block text-[10px] font-bold uppercase tracking-[0.24em] text-[#d9b46a]">
                  {ach.laurel}
                </span>
                <span className="block text-[8px] font-semibold tracking-widest text-[#d9b46a]/70 uppercase mt-0.5">
                  HONOR
                </span>
              </div>
              <LaurelWreath side="r" />
            </div>

            {/* Title & Details */}
            <h3 className="relative mt-5 font-display text-[2.1rem] leading-[0.92] tracking-wide text-bone group-hover:text-white transition">
              {ach.title}
            </h3>

            <p className="relative mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#d9b46a]">
              {ach.org}
            </p>

            <p className="relative mt-4 text-[13px] leading-relaxed text-bone/75 font-light">
              {ach.detail}
            </p>

            <div className="relative mt-auto pt-5 flex items-center gap-1.5 text-xs font-semibold text-[#d9b46a]/90">
              <Award className="h-4 w-4" />
              <span>Verified Credential</span>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};
