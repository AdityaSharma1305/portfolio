import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { seasons, Season, Episode } from "../data/seasons";
import { SectionHeader } from "../components/SectionHeader";
import { PaletteBackground } from "../components/ProjectArtwork";
import { sound } from "../utils/sound";
import { Clock, Tag } from "lucide-react";

export const Journey: React.FC = () => {
  const [activeSeasonIdx, setActiveSeasonIdx] = useState<number>(0);
  const railRef = useRef<HTMLDivElement>(null);

  const activeSeason: Season = seasons[activeSeasonIdx] || seasons[0];

  const handleSeasonChange = (idx: number) => {
    sound.playClick();
    setActiveSeasonIdx(idx);
    railRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  };

  return (
    <section id="journey" className="py-16 md:py-24 select-none">
      <SectionHeader
        kicker={`${seasons.length} Seasons`}
        title="My Journey"
        aside={
          <p className="max-w-xs text-sm text-mist font-light">
            Every chapter of my engineering journey told as an episodic season.
          </p>
        }
      />

      {/* Season Tab Rail */}
      <div className="gutter mb-8 flex gap-2.5 overflow-x-auto scrollbar-none" role="tablist" aria-label="Seasons">
        {seasons.map((season, idx) => {
          const isActive = idx === activeSeasonIdx;
          return (
            <button
              key={season.number}
              role="tab"
              aria-selected={isActive}
              type="button"
              onClick={() => handleSeasonChange(idx)}
              className={`relative shrink-0 rounded-full px-5 py-3 text-left transition focus:outline-none ${
                isActive ? "text-ink font-bold" : "text-mist hover:text-bone"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="season-pill"
                  className="absolute inset-0 rounded-full bg-bone shadow-md"
                  transition={{ duration: 0.4 }}
                />
              )}
              <span className="relative block text-[10px] font-bold tracking-[0.24em] uppercase">
                SEASON {String(season.number).padStart(2, "0")}
              </span>
              <span className="relative block whitespace-nowrap text-sm font-semibold">
                {season.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Season Overview */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSeason.number}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <div className="gutter mb-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h3 className="font-display text-4xl tracking-wide text-bone sm:text-5xl">
              <span className="text-outline mr-3">
                S{String(activeSeason.number).padStart(2, "0")}
              </span>
              {activeSeason.title}
            </h3>
            <span className="text-sm text-mist font-medium">
              {activeSeason.period} • {activeSeason.episodes.length}{" "}
              {activeSeason.episodes.length === 1 ? "Episode" : "Episodes"}
            </span>
          </div>

          <p className="gutter max-w-3xl text-[15px] leading-relaxed text-bone/75 font-light">
            {activeSeason.synopsis}
          </p>

          {/* Episode Cards Rail */}
          <div className="relative mt-6">
            <div
              ref={railRef}
              className="gutter flex snap-x snap-mandatory gap-4 overflow-x-auto py-6 scrollbar-none [perspective:1200px]"
            >
              {activeSeason.episodes.map((ep, epIdx) => (
                <motion.article
                  key={ep.code}
                  className="group relative w-[80vw] shrink-0 snap-start overflow-hidden rounded-2xl bg-ink-2 shadow-xl ring-1 ring-white/10 transition duration-500 hover:ring-crimson-2/80 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] sm:w-[50vw] lg:w-[36vw] xl:w-[30vw]"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: epIdx * 0.08, duration: 0.5 }}
                >
                  {/* Top Artwork Bar */}
                  <div className="relative h-28 overflow-hidden">
                    <PaletteBackground palette={ep.palette} />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-2 to-transparent" />
                    <div className="absolute top-4 left-4 flex items-center justify-between right-4">
                      <span className="rounded bg-black/60 backdrop-blur-md px-2.5 py-1 text-[11px] font-mono font-bold text-bone">
                        {ep.code}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-bone/80 bg-black/40 backdrop-blur px-2 py-0.5 rounded">
                        <Clock className="h-3 w-3 text-crimson-2" />
                        {ep.runtime}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6">
                    <h4 className="font-display text-2xl sm:text-3xl tracking-wide text-bone group-hover:text-white transition">
                      {ep.title}
                    </h4>
                    <p className="mt-2 text-xs sm:text-sm text-mist leading-relaxed font-light">
                      {ep.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
                      {ep.tags.map((tag) => (
                        <span
                          key={tag}
                          className="flex items-center gap-1 rounded bg-white/5 px-2.5 py-1 text-[10px] font-semibold text-mist"
                        >
                          <Tag className="h-2.5 w-2.5 text-crimson-2" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};
