import React, { useRef } from "react";
import { motion } from "framer-motion";
import { editorialPicks } from "../data/projects";
import { SectionHeader } from "../components/SectionHeader";
import { PaletteBackground } from "../components/ProjectArtwork";

export const TopPicks: React.FC = () => {
  const railRef = useRef<HTMLDivElement>(null);

  return (
    <section id="picks" className="py-16 md:py-24 select-none">
      <SectionHeader
        kicker="Highlights"
        title="Top 5 Highlights"
        aside={
          <p className="max-w-xs text-sm text-mist font-light">
            Editorial highlights capturing core engineering strengths and verified achievements.
          </p>
        }
      />

      <div className="relative">
        <div
          ref={railRef}
          className="gutter flex snap-x snap-mandatory gap-4 overflow-x-auto py-8 scrollbar-none"
        >
          {editorialPicks.map((pick, idx) => (
            <motion.div
              key={pick.title}
              className="group relative flex h-[270px] shrink-0 snap-start items-end sm:h-[310px]"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
            >
              {/* Giant Netflix Outline Rank Number */}
              <span
                aria-hidden="true"
                className="text-outline -mr-6 sm:-mr-8 select-none font-display leading-[0.76] transition duration-500 group-hover:[-webkit-text-stroke-color:rgba(255,61,90,0.85)]"
                style={{ fontSize: "clamp(10rem, 24vw, 17rem)" }}
              >
                {idx + 1}
              </span>

              {/* Highlight Card */}
              <div className="relative z-10 h-[86%] w-[160px] overflow-hidden rounded-xl shadow-[-14px_0_35px_rgba(0,0,0,0.85)] ring-1 ring-white/10 transition duration-500 group-hover:-translate-y-2 group-hover:ring-white/30 sm:w-[190px]">
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                  <PaletteBackground palette={pick.palette} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-between p-4">
                  <span className="text-[9px] font-bold uppercase tracking-[0.26em] text-bone/70">
                    {pick.label}
                  </span>
                  <div>
                    <p className="font-display text-[1.85rem] leading-[0.92] tracking-wide text-bone group-hover:text-white transition">
                      {pick.title}
                    </p>
                    <p className="mt-1.5 text-[11px] leading-snug text-mist">
                      {pick.detail}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
