import React, { useRef } from "react";
import { motion } from "framer-motion";
import { palettes, Palette } from "../data/projects";
import { PaletteBackground } from "../components/ProjectArtwork";
import { sound } from "../utils/sound";
import { Play } from "lucide-react";

interface RibbonProps {
  order: string[];
}

interface SectionCardMeta {
  card: string;
  meta: string;
  palette: Palette;
  watermark: string;
}

const sectionMetaMap: Record<string, SectionCardMeta> = {
  about: {
    card: "About Me",
    meta: "Education • Summary",
    palette: palettes.purple,
    watermark: "01"
  },
  journey: {
    card: "The Journey",
    meta: "5 Seasons • Roles & Degree",
    palette: palettes.amber,
    watermark: "02"
  },
  originals: {
    card: "Featured Projects",
    meta: "4 Verified Productions",
    palette: palettes.crimson,
    watermark: "03"
  },
  picks: {
    card: "Top Highlights",
    meta: "5 Editorial Picks",
    palette: palettes.emerald,
    watermark: "04"
  },
  skills: {
    card: "Technical Skills",
    meta: "5 Matrix Categories",
    palette: palettes.cyan,
    watermark: "05"
  },
  moments: {
    card: "Achievements",
    meta: "5-Star Java • 350+ Solved",
    palette: palettes.crimson,
    watermark: "06"
  },
  story: {
    card: "Resume Screenplay",
    meta: "View & Download PDF",
    palette: palettes.purple,
    watermark: "07"
  }
};

export const Ribbon: React.FC<RibbonProps> = ({ order }) => {
  const railRef = useRef<HTMLDivElement>(null);

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
    <section aria-labelledby="continue-title" className="relative z-10 -mt-8 pb-14 sm:-mt-14 select-none">
      <div className="gutter mb-4 flex items-end justify-between">
        <h2
          id="continue-title"
          className="font-sans text-lg font-semibold tracking-tight text-bone sm:text-2xl"
        >
          Continue Exploring
        </h2>
        <span className="hidden text-xs text-smoke sm:block">
          Tap any episode to jump directly into the series
        </span>
      </div>

      <div className="relative">
        <div
          ref={railRef}
          className="gutter flex snap-x snap-mandatory gap-3.5 overflow-x-auto py-4 scrollbar-none sm:gap-5"
        >
          {order.map((secId, idx) => {
            const data = sectionMetaMap[secId] || {
              card: secId,
              meta: "Episode",
              palette: palettes.crimson,
              watermark: String(idx + 1).padStart(2, "0")
            };

            return (
              <motion.button
                key={secId}
                type="button"
                data-cursor="play"
                onClick={() => scrollTo(secId)}
                className="group relative aspect-video w-[74vw] shrink-0 snap-start overflow-visible text-left sm:w-[42vw] md:w-[32vw] lg:w-[23vw] focus:outline-none"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5% 0px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-xl ring-1 ring-white/10 transition duration-500 group-hover:scale-105 group-hover:ring-crimson-2/80 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
                  {/* Background Palette */}
                  <PaletteBackground palette={data.palette}>
                    <span className="absolute -right-2 -top-6 font-display text-[8rem] leading-none text-white/[0.08] sm:text-[9.5rem] pointer-events-none">
                      {data.watermark}
                    </span>
                  </PaletteBackground>

                  {/* Card Content Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <span className="mb-1 text-[10px] font-bold uppercase tracking-[0.3em] text-crimson-2">
                      Episode {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-2xl leading-none tracking-wide text-bone transition-transform duration-500 group-hover:-translate-y-1 sm:text-3xl">
                      {data.card}
                    </span>
                    <span className="mt-1 text-xs text-mist">
                      {data.meta}
                    </span>
                  </div>

                  {/* Play Icon Badge */}
                  <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-bone backdrop-blur-md transition duration-300 group-hover:scale-110 group-hover:bg-crimson">
                    <Play className="h-4 w-4 fill-current ml-0.5" />
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
