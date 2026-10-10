import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillCategories, skillToProjects, Skill } from "../data/skills";
import { SectionHeader } from "../components/SectionHeader";
import { sound } from "../utils/sound";
import { Check, Sparkles } from "lucide-react";

const categoryHues = ["#ff3d5a", "#4cc9ff", "#46e3a8", "#ffb547", "#b98bff"];

export const SkillsMatrix: React.FC = () => {
  const [activeCategoryIdx, setActiveCategoryIdx] = useState<number>(0);
  const activeCategory = skillCategories[activeCategoryIdx] || skillCategories[0];
  const activeHue = categoryHues[activeCategoryIdx % categoryHues.length];

  const handleTabClick = (idx: number) => {
    sound.playClick();
    setActiveCategoryIdx(idx);
  };

  return (
    <section id="skills" className="py-16 md:py-24 select-none">
      <SectionHeader
        kicker="Genres"
        title="My Skill Universe"
        aside={
          <p className="max-w-xs text-sm text-mist font-light">
            Interactive skill matrix. Tap any technology to view where it is implemented in genuine production code.
          </p>
        }
      />

      <div className="gutter grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-14">
        {/* Left Category Tabs */}
        <div
          className="flex gap-2 overflow-x-auto scrollbar-none pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
          role="tablist"
          aria-label="Skill categories"
        >
          {skillCategories.map((cat, idx) => {
            const isActive = idx === activeCategoryIdx;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleTabClick(idx)}
                className={`group relative shrink-0 rounded-xl px-4 py-3 text-left transition focus:outline-none lg:px-5 ${
                  isActive ? "text-bone" : "text-smoke hover:text-bone"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="skill-tab"
                    className="absolute inset-0 rounded-xl bg-white/[0.08] ring-1 ring-white/10"
                    transition={{ duration: 0.4 }}
                  />
                )}
                {isActive && (
                  <motion.span
                    layoutId="skill-bar"
                    className="absolute bottom-2 left-0 top-2 hidden w-[3px] rounded-r lg:block"
                    style={{ background: activeHue }}
                  />
                )}
                <span className="relative block font-display text-2xl tracking-wide lg:text-3xl">
                  {cat.title}
                </span>
                <span className="relative hidden text-xs text-smoke lg:block mt-0.5">
                  {cat.skills.length} skills • {cat.subtitle}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Skills Grid */}
        <div className="min-h-[340px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <p className="mb-5 text-sm text-mist font-light">
                <span className="font-semibold text-bone">{activeCategory.title}</span> —{" "}
                {activeCategory.subtitle}
              </p>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                {activeCategory.skills.map((skill) => (
                  <SkillCard
                    key={skill.name}
                    skill={skill}
                    hue={activeHue}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const SkillCard: React.FC<{ skill: Skill; hue: string }> = ({ skill, hue }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const matchedProjects = skillToProjects[skill.name];

  return (
    <motion.button
      type="button"
      onClick={() => {
        sound.playClick();
        setExpanded((e) => !e);
      }}
      whileHover={{ y: -4 }}
      className={`group relative flex min-h-[140px] flex-col justify-between overflow-hidden rounded-xl bg-ink-2 p-4 text-left ring-1 ring-white/10 transition-all duration-300 hover:ring-white/30 hover:shadow-xl focus:outline-none ${
        expanded ? "ring-2 ring-crimson-2" : ""
      }`}
    >
      {/* Top Monogram and Indicator */}
      <div className="flex items-start justify-between w-full">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-lg font-mono text-sm font-bold shadow-md"
          style={{
            background: `linear-gradient(135deg, ${hue}33, #0e0e13)`,
            color: hue,
            border: `1px solid ${hue}55`
          }}
        >
          {skill.mono}
        </span>
        {matchedProjects && (
          <span className="text-[10px] font-bold text-mist/70 tracking-wider">
            {matchedProjects.length} {matchedProjects.length === 1 ? "PROJECT" : "PROJECTS"}
          </span>
        )}
      </div>

      {/* Skill Name */}
      <div className="mt-3">
        <h4 className="font-sans text-sm font-bold text-bone group-hover:text-white transition">
          {skill.name}
        </h4>
        {matchedProjects ? (
          <p className="text-[11px] text-mist font-light mt-0.5 truncate">
            {matchedProjects.join(", ")}
          </p>
        ) : (
          <p className="text-[11px] text-smoke font-light mt-0.5">Core Proficiency</p>
        )}
      </div>

      {/* Expanded project banner if clicked */}
      {expanded && matchedProjects && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-2 pt-2 border-t border-white/10 text-[10px] text-crimson-2 font-semibold"
        >
          Featured in: {matchedProjects.join(" & ")}
        </motion.div>
      )}
    </motion.button>
  );
};
