import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Project, projects } from "../data/projects";
import { ProjectArtwork } from "./ProjectArtwork";
import { sound } from "../utils/sound";
import { ExternalLink, X, CheckCircle2 } from "lucide-react";
import { GithubIcon } from "./Icons";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
  onSwitch: (project: Project) => void;
}

const itemVariant = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5 } }
};

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onSwitch
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    sound.playWhoosh();
    closeButtonRef.current?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [project.id]);

  const otherProjects = projects.filter((p) => p.id !== project.id);

  return (
    <div
      className="fixed inset-0 z-[140] overflow-y-auto overscroll-contain select-none"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`title-${project.id}-modal`}
    >
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        ref={scrollRef}
        className="relative min-h-screen px-2 py-4 sm:px-6 sm:py-10 z-10 flex justify-center items-start"
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-5xl rounded-2xl bg-ink-2 shadow-2xl border border-white/10 overflow-hidden text-left"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ duration: 0.4 }}
        >
          {/* Header Banner with Artwork */}
          <div className="relative h-[48vh] min-h-[320px] overflow-hidden">
            <ProjectArtwork project={project} className="absolute inset-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-2 via-ink-2/40 to-transparent" />

            {/* Close Button */}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              data-cursor="close"
              aria-label="Close project modal"
              className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-bone backdrop-blur-md transition hover:bg-black hover:scale-105"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Poster Details */}
            <div className="absolute inset-x-0 bottom-0 px-6 pb-6 sm:px-10">
              <p className="mb-2 flex items-center gap-2 text-[11px] font-bold tracking-[0.34em] text-bone/80">
                <span className="font-display text-xl tracking-normal text-crimson-2">A</span>
                ORIGINAL
              </p>
              <h2
                id={`title-${project.id}-modal`}
                className="font-display text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.88] tracking-wide text-bone"
              >
                {project.title}
              </h2>
            </div>
          </div>

          {/* Modal Body */}
          <motion.div
            className="px-6 pb-12 sm:px-10"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          >
            {/* Metadata Bar */}
            <motion.div
              variants={itemVariant}
              className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-mist pt-4"
            >
              <span className="font-bold text-[#46e3a8]">{project.year}</span>
              <span className="h-1 w-1 rounded-full bg-smoke" />
              <span className="tracking-wide">{project.genre}</span>
            </motion.div>

            {/* Logline */}
            <motion.p
              variants={itemVariant}
              className="mt-4 max-w-3xl text-lg leading-relaxed text-bone/90 sm:text-xl font-light"
            >
              {project.logline}
            </motion.p>

            {/* Action Links */}
            <motion.div variants={itemVariant} className="mt-6 flex flex-wrap gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="link"
                  className="flex min-h-11 items-center gap-2 rounded-md bg-bone px-6 text-sm font-bold text-ink transition hover:bg-white hover:shadow-lg"
                >
                  <GithubIcon className="h-4 w-4" />
                  GitHub Repository
                  <ExternalLink className="h-3.5 w-3.5 opacity-60 ml-0.5" />
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="link"
                  className="glass flex min-h-11 items-center gap-2 rounded-md px-6 text-sm font-bold text-bone transition hover:bg-white/15"
                >
                  Live Demo
                  <ExternalLink className="h-3.5 w-3.5 opacity-60 ml-0.5" />
                </a>
              )}
            </motion.div>

            {/* Results / Metrics Grid */}
            {project.metrics && project.metrics.length > 0 && (
              <motion.section variants={itemVariant} className="mt-10">
                <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-crimson-2">
                  System Architecture &amp; Impact
                </h3>
                <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/10 sm:grid-cols-3 lg:grid-cols-5">
                  {project.metrics.map((metric, mIdx) => (
                    <div key={metric.label} className="bg-ink p-4 sm:p-5">
                      <p
                        className="font-display text-4xl leading-none text-bone sm:text-5xl"
                        style={{ color: mIdx === 0 ? project.palette.accent : undefined }}
                      >
                        {metric.value}
                      </p>
                      <p className="mt-2 text-xs leading-snug text-mist">{metric.label}</p>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Technical Breakdown Grid */}
            <div className="mt-12 grid gap-10 lg:grid-cols-[3fr_2fr]">
              {/* Engineering Contributions */}
              <motion.section variants={itemVariant}>
                <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-crimson-2">
                  Technical Architecture &amp; Implementation
                </h3>
                <ul className="space-y-4">
                  {project.build.map((item, bIdx) => (
                    <li key={bIdx} className="flex gap-3 text-[15px] leading-relaxed text-bone/85">
                      <span
                        className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: project.palette.accent }}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.section>

              {/* Stack & Features */}
              <div className="space-y-10">
                {/* Tech Stack */}
                <motion.section variants={itemVariant}>
                  <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-crimson-2">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="glass rounded-full px-3 py-1.5 text-xs font-semibold text-bone"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.section>

                {/* Key Features */}
                <motion.section variants={itemVariant}>
                  <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-crimson-2">
                    Core Capabilities
                  </h3>
                  <ul className="space-y-2.5">
                    {project.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-sm text-bone/85">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-crimson-2 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </motion.section>
              </div>
            </div>

            {/* More Originals Section */}
            <motion.section variants={itemVariant} className="mt-14 border-t border-white/10 pt-8">
              <h3 className="mb-4 font-sans text-lg font-semibold text-bone">More Originals</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {otherProjects.map((other) => (
                  <button
                    key={other.id}
                    type="button"
                    data-cursor="view"
                    onClick={() => {
                      sound.playClick();
                      onSwitch(other);
                    }}
                    className="group relative aspect-video overflow-hidden rounded-xl text-left ring-1 ring-white/10 transition hover:ring-white/30"
                  >
                    <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                      <ProjectArtwork project={other} />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-mist">
                        {other.genre.split("•")[0]}
                      </p>
                      <p className="font-display text-2xl leading-none tracking-wide text-bone mt-1">
                        {other.title}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.section>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
