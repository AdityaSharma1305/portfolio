import React from "react";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  kicker: string;
  title: string;
  aside?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ kicker, title, aside }) => {
  return (
    <div className="gutter mb-6 flex flex-wrap items-end justify-between gap-4 md:mb-10">
      <div>
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-2 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-crimson-2"
        >
          <span className="h-px w-8 bg-crimson-2" />
          {kicker}
        </motion.div>
        <h2 className="font-display text-[clamp(2.5rem,6vw,5.2rem)] leading-[0.9] tracking-wide text-bone">
          {title}
        </h2>
      </div>
      {aside && <div>{aside}</div>}
    </div>
  );
};
