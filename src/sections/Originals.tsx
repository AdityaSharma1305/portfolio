import React, { useRef } from "react";
import { motion } from "framer-motion";
import { projects, Project } from "../data/projects";
import { profile } from "../data/profile";
import { ProjectArtwork } from "../components/ProjectArtwork";
import { sound } from "../utils/sound";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "../components/Icons";

interface OriginalsProps {
  onOpen: (project: Project) => void;
}

export const Originals: React.FC<OriginalsProps> = ({ onOpen }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollBy = (amount: number) => {
    sound.playClick();
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <section id="originals" className="py-16 md:py-24 select-none relative">
      {/* Section Header Row */}
      <div className="gutter mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="mb-2 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-crimson-2">
            <span className="h-px w-8 bg-crimson-2" />
            {projects.length} Productions • 2024–2025
          </div>
          <h2 className="font-display text-[clamp(3.2rem,8vw,7rem)] leading-[0.88] text-bone tracking-wide">
            ORIGINALS
          </h2>
          <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-mist font-light">
            Verified full-stack and backend software solutions. Tap any production to inspect architectural details, Postman validations, and source code.
          </p>
        </div>

        {/* Carousel Arrow Controls */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollBy(-420)}
            aria-label="Previous project"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-bone hover:bg-white/10 transition"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(420)}
            aria-label="Next project"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-bone hover:bg-white/10 transition"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Project Cards Carousel */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="gutter flex snap-x snap-mandatory gap-5 overflow-x-auto py-6 scrollbar-none [perspective:1400px]"
        >
          {projects.map((proj, idx) => (
            <motion.article
              key={proj.id}
              className="w-[84vw] shrink-0 snap-start sm:w-[58vw] lg:w-[42vw] xl:w-[35vw]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px -5% 0px 0px" }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
            >
              <div
                data-cursor="view"
                onClick={() => {
                  sound.playClick();
                  onOpen(proj);
                }}
                className="group relative cursor-pointer overflow-hidden rounded-2xl bg-ink-2 shadow-2xl ring-1 ring-white/10 transition duration-500 hover:ring-crimson-2/80 hover:shadow-[0_25px_60px_rgba(0,0,0,0.9)] hover:-translate-y-2"
              >
                {/* Artwork Banner */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                    <ProjectArtwork project={proj} />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-2 via-ink-2/30 to-transparent" />

                  {/* Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="flex items-center gap-1.5 rounded bg-crimson px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider shadow-md">
                      ORIGINAL
                    </span>
                    <span className="glass rounded px-2 py-0.5 text-[10px] font-semibold text-bone">
                      {proj.year}
                    </span>
                  </div>
                </div>

                {/* Content Card */}
                <div className="p-5 sm:p-6">
                  <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-crimson-2">
                    {proj.genre}
                  </p>
                  <h3 className="mt-1 font-display text-3xl sm:text-4xl leading-tight text-bone tracking-wide group-hover:text-white transition">
                    {proj.title}
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-sm text-mist line-clamp-2 leading-relaxed">
                    {proj.logline}
                  </p>

                  {/* Tech stack pills */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {proj.stack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-white/5 border border-white/10 px-2.5 py-1 text-[11px] font-medium text-bone/85"
                      >
                        {tech}
                      </span>
                    ))}
                    {proj.stack.length > 4 && (
                      <span className="rounded-md bg-white/5 px-2 py-1 text-[11px] font-medium text-smoke">
                        +{proj.stack.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Card Footer Actions */}
                  <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-xs font-bold text-crimson-2 tracking-wider flex items-center gap-1 group-hover:underline">
                      EXPLORE ORIGINAL →
                    </span>
                    <span className="text-xs text-smoke font-mono">
                      {proj.metrics[0]?.value || "PRODUCTION"}
                    </span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}

          {/* More on GitHub Card */}
          <motion.a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            data-cursor="link"
            className="group flex aspect-[16/10] w-[70vw] shrink-0 snap-start flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-white/20 text-center transition hover:border-crimson-2/80 hover:bg-white/[0.02] sm:w-[44vw] lg:w-[26vw]"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/25 text-xl text-bone transition duration-300 group-hover:scale-110 group-hover:border-crimson-2 group-hover:text-crimson-2">
              <GithubIcon className="h-6 w-6" />
            </span>
            <div>
              <span className="font-display text-2xl tracking-wide text-bone block">
                More on GitHub
              </span>
              <span className="text-xs text-mist block mt-1">
                github.com/AdityaSharma1305
              </span>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
};
