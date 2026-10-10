import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { personaProfiles, profile } from "../data/profile";
import { sound } from "../utils/sound";

interface ProfilesProps {
  onPick: (profileId: string) => void;
}

export const ProfileAvatar: React.FC<{ id: string; size?: "sm" | "lg" }> = ({
  id,
  size = "lg"
}) => {
  const p = personaProfiles.find((item) => item.id === id);
  const sizeClasses =
    size === "lg"
      ? "h-24 w-24 sm:h-32 sm:w-32 md:h-36 md:w-36 rounded-xl"
      : "h-8 w-8 rounded-md";

  if (id === "aditya") {
    return (
      <span
        className={`relative block overflow-hidden ${sizeClasses}`}
        style={{ background: "radial-gradient(circle at 50% 30%, #7a0f24, #1a0509)" }}
      >
        <img
          src="/images/portrait-420.webp"
          alt={profile.displayName}
          className="absolute inset-x-0 bottom-0 mx-auto h-[115%] w-auto max-w-none object-cover object-top"
        />
      </span>
    );
  }

  const icons: Record<string, string> = {
    recruiter: "R",
    developer: "</>",
    creative: "✦"
  };

  return (
    <span
      className={`relative flex items-center justify-center overflow-hidden font-display text-bone ${sizeClasses}`}
      style={{
        background: `linear-gradient(145deg, ${p?.color || "#e5132b"}, #0b0b10 120%)`
      }}
    >
      <span className={size === "lg" ? "text-4xl sm:text-5xl" : "text-sm"}>
        {icons[id] || "A"}
      </span>
    </span>
  );
};

export const Profiles: React.FC<ProfilesProps> = ({ onPick }) => {
  useEffect(() => {
    sound.playWhoosh();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onPick("aditya");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onPick]);

  return (
    <motion.div
      className="fixed inset-0 z-[110] flex flex-col items-center justify-center overflow-y-auto bg-ink px-4 py-16 select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.08, filter: "blur(10px)" }}
      transition={{ duration: 0.7 }}
      role="dialog"
      aria-label="Who's watching?"
    >
      {/* Ambient Crimson Top Glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(229,19,43,0.16),transparent_70%)] pointer-events-none"
      />

      <motion.h2
        className="relative mb-10 text-center font-sans text-3xl font-medium tracking-tight text-bone sm:text-5xl"
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8 }}
      >
        Who's watching?
      </motion.h2>

      <motion.ul
        className="relative grid grid-cols-2 gap-6 sm:flex sm:gap-8"
        initial="hidden"
        animate="show"
        variants={{
          show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } }
        }}
      >
        {personaProfiles.map((p) => (
          <motion.li
            key={p.id}
            variants={{
              hidden: { opacity: 0, y: 24 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
          >
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onPick(p.id);
              }}
              data-cursor="play"
              className="group flex flex-col items-center gap-3 text-center focus:outline-none"
            >
              <span className="relative rounded-xl ring-2 ring-transparent transition duration-300 group-hover:scale-105 group-hover:ring-bone group-focus-visible:ring-bone">
                <ProfileAvatar id={p.id} size="lg" />
                {p.id === "aditya" && (
                  <span className="absolute -right-2 -top-2 rounded-full bg-crimson px-2 py-0.5 text-[9px] font-bold tracking-[0.18em] text-white">
                    ORIGINAL
                  </span>
                )}
              </span>

              <div className="space-y-1">
                <span className="block font-sans text-sm font-semibold tracking-wide text-bone transition group-hover:text-white sm:text-base">
                  {p.name}
                </span>
                <span className="block max-w-[120px] text-[11px] leading-tight text-mist sm:max-w-[140px]">
                  {p.blurb}
                </span>
              </div>
            </button>
          </motion.li>
        ))}
      </motion.ul>

      <motion.p
        className="mt-14 text-xs tracking-widest uppercase text-smoke"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Select a profile to curate your experience
      </motion.p>
    </motion.div>
  );
};
