import React from "react";
import { motion } from "framer-motion";
import { profile } from "../data/profile";
import { projects } from "../data/projects";
import { achievementsList } from "../data/profile";
import { SectionHeader } from "../components/SectionHeader";
import { ResumeDocument } from "../components/ResumeDocument";
import { sound } from "../utils/sound";
import { Play, Download, FileText } from "lucide-react";

interface FullStoryProps {
  onView: () => void;
}

export const FullStory: React.FC<FullStoryProps> = ({ onView }) => {
  return (
    <section id="story" className="py-16 md:py-24 select-none">
      <SectionHeader kicker="The Screenplay" title="The Full Story" />

      <div className="gutter grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-14 items-start">
        {/* Left: Scaled Interactive Document Preview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.9 }}
          className="relative max-h-[580px] overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-zinc-950/60 p-2 sm:p-4 group"
        >
          <div className="opacity-95 pointer-events-none transform scale-[0.98] origin-top">
            <ResumeDocument />
          </div>

          {/* Fade to bottom */}
          <div className="absolute inset-x-0 bottom-0 flex h-48 items-end justify-center rounded-b-2xl bg-gradient-to-t from-ink via-ink/90 to-transparent pb-6">
            <button
              type="button"
              data-cursor="view"
              onClick={() => {
                sound.playClick();
                onView();
              }}
              className="glass flex items-center gap-2 rounded-full px-7 py-3 text-sm font-bold text-bone shadow-xl hover:bg-white/15 transition hover:scale-105"
            >
              <FileText className="h-4 w-4 text-crimson-2" />
              Expand Full Screenplay
            </button>
          </div>
        </motion.div>

        {/* Right Sticky Sidebar Callout */}
        <div className="lg:sticky lg:top-28 lg:self-start space-y-6">
          <div>
            <p className="font-serif text-3xl italic leading-tight text-bone">
              Every episode, on one page.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-mist font-light">
              Undergraduate degree at AKTU, core Java &amp; Spring Boot projects, competitive problem solving milestones, and verified certifications.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <button
              type="button"
              data-cursor="view"
              onClick={() => {
                sound.playClick();
                onView();
              }}
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-bone px-6 text-sm font-bold text-ink transition hover:bg-white hover:shadow-lg"
            >
              <Play className="h-4 w-4 fill-ink" />
              View Full Resume
            </button>

            <a
              href={profile.resumePdf}
              download="Aditya_Sharma_Resume.pdf"
              data-cursor="link"
              className="glass flex min-h-12 w-full items-center justify-center gap-2 rounded-md px-6 text-sm font-semibold text-bone transition hover:bg-white/15"
            >
              <Download className="h-4 w-4" />
              Download PDF Copy
            </a>
          </div>

          {/* Stat Numbers */}
          <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-xl bg-white/10 text-center">
            <div className="bg-ink-2 px-2 py-4">
              <dd className="font-display text-3xl leading-none text-bone">350+</dd>
              <dt className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-smoke">
                Solved
              </dt>
            </div>
            <div className="bg-ink-2 px-2 py-4">
              <dd className="font-display text-3xl leading-none text-bone">
                {projects.length}
              </dd>
              <dt className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-smoke">
                Originals
              </dt>
            </div>
            <div className="bg-ink-2 px-2 py-4">
              <dd className="font-display text-3xl leading-none text-bone">
                {achievementsList.length}
              </dd>
              <dt className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-smoke">
                Honors
              </dt>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
};
