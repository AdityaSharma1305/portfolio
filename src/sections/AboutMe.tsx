import React from "react";
import { motion } from "framer-motion";
import { profile, educationList } from "../data/profile";
import { SectionHeader } from "../components/SectionHeader";
import { GraduationCap, Code2, Award, Server } from "lucide-react";

export const AboutMe: React.FC = () => {
  const stats = [
    {
      k: "Education",
      v: "B.Tech CS (AI)",
      s: "Dr. APJ Abdul Kalam Technical University (2022–2026)",
      icon: GraduationCap
    },
    {
      k: "Primary Focus",
      v: "Java & Spring Boot",
      s: "RESTful APIs, Hibernate & MySQL",
      icon: Server
    },
    {
      k: "Problem Solving",
      v: "350+ Solved",
      s: "LeetCode & HackerRank algorithms",
      icon: Code2
    },
    {
      k: "Recognition",
      v: "5-Star Java",
      s: "HackerRank Gold Java Badge",
      icon: Award
    }
  ];

  return (
    <section id="about" className="py-16 md:py-24 select-none">
      <SectionHeader kicker="The Pilot" title="About Me" />

      <div className="gutter grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
        {/* Left: 3D Portrait Poster Card */}
        <motion.div
          className="mx-auto w-full max-w-md lg:max-w-none"
          initial={{ opacity: 0, scale: 0.9, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1 }}
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-2xl group transition duration-500 hover:ring-crimson-2/60">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_30%,#5a0b1b,#14060a_60%,#07070a)]" />
            <div className="absolute inset-0 opacity-40 [background-image:repeating-linear-gradient(90deg,rgba(255,255,255,0.03)_0px,rgba(255,255,255,0.03)_1px,transparent_1px,transparent_28px)] pointer-events-none" />

            {/* Cutout Portrait Image */}
            <img
              src={profile.portrait.src}
              srcSet={profile.portrait.srcSet}
              alt={profile.portrait.alt}
              loading="lazy"
              className="absolute bottom-0 left-1/2 h-[94%] w-auto max-w-none -translate-x-1/2 object-contain object-bottom drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
            />

            {/* Bottom Vignette */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/95 to-transparent" />

            {/* Poster Tag details */}
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
              <div>
                <p className="text-[10px] font-bold tracking-[0.3em] text-crimson-2 uppercase">
                  STARRING
                </p>
                <p className="font-display text-3xl leading-none text-bone mt-0.5">
                  {profile.displayName}
                </p>
              </div>
              <span className="rounded border border-white/30 px-2 py-0.5 text-[10px] font-bold text-bone">
                S01–S05
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right: Quote and Key Stats Grid */}
        <div>
          <motion.p
            className="font-serif text-[clamp(1.5rem,3vw,2.4rem)] italic leading-[1.25] text-bone"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            “{profile.intro}”
          </motion.p>
          <p className="mt-3 text-sm font-semibold tracking-wider text-mist">
            — {profile.fullName}
          </p>

          {/* Stats Grid */}
          <motion.dl
            className="mt-10 grid gap-px overflow-hidden rounded-xl bg-white/10 sm:grid-cols-2"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          >
            {stats.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-ink-2 p-5 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-mist">
                    <span>{item.k}</span>
                    <Icon className="h-4 w-4 text-crimson-2" />
                  </div>
                  <div className="mt-3">
                    <dt className="font-display text-2xl text-bone">{item.v}</dt>
                    <dd className="mt-1 text-xs text-smoke font-light">{item.s}</dd>
                  </div>
                </div>
              );
            })}
          </motion.dl>
        </div>
      </div>
    </section>
  );
};
