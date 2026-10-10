import React from "react";
import { Project, Palette } from "../data/projects";

interface PaletteBackgroundProps {
  palette: Palette;
  children?: React.ReactNode;
  className?: string;
}

export const PaletteBackground: React.FC<PaletteBackgroundProps> = ({
  palette,
  children,
  className = ""
}) => {
  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(120% 90% at 85% 10%, ${palette.via} 0%, transparent 60%),
                     radial-gradient(90% 80% at 0% 100%, ${palette.from} 0%, transparent 70%),
                     linear-gradient(160deg, ${palette.from} 0%, ${palette.to} 100%)`
      }}
    >
      <div
        aria-hidden="true"
        className="absolute -right-1/4 -top-1/3 h-[140%] w-[70%] rotate-[18deg] opacity-40 blur-2xl pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, ${palette.accent}55, transparent)`
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-80 pointer-events-none"
      />
      {children}
    </div>
  );
};

export const ProjectArtwork: React.FC<{ project: Project; className?: string }> = ({
  project,
  className = ""
}) => {
  const accent = project.palette.accent;

  return (
    <PaletteBackground palette={project.palette} className={className}>
      <svg
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id={`g-${project.id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.55" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="290" cy="120" r="130" fill={`url(#g-${project.id})`} />

        {project.motif === "shield" && (
          <g transform="translate(232 40)" fill="none" stroke={accent} strokeOpacity="0.85">
            <path d="M58 0 L116 22 V78 C116 120 90 146 58 160 C26 146 0 120 0 78 V22 Z" strokeWidth="2" />
            <path d="M58 16 L102 33 V78 C102 111 82 132 58 144 C34 132 14 111 14 78 V33 Z" strokeWidth="1" strokeOpacity="0.4" />
            {[0, 1, 2, 3, 4].map((n) => (
              <line
                key={n}
                x1="30"
                x2={n % 2 ? 72 : 86}
                y1={56 + n * 14}
                y2={56 + n * 14}
                strokeWidth="3"
                strokeLinecap="round"
                strokeOpacity={0.35 + n * 0.1}
              />
            ))}
            <path d="M40 124 l12 12 l26 -28" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        )}

        {project.motif === "flow" && (
          <g fill="none" stroke={accent}>
            <rect x="200" y="56" width="150" height="94" rx="12" strokeWidth="2" strokeOpacity="0.85" />
            <rect x="214" y="72" width="28" height="20" rx="4" strokeOpacity="0.7" />
            <line x1="214" x2="330" y1="124" y2="124" strokeWidth="3" strokeOpacity="0.4" strokeDasharray="18 8" />
            <g transform="translate(176 196)" fontFamily="Inter" fontSize="10" fill={accent} stroke="none" letterSpacing="2">
              <circle cx="16" cy="16" r="16" fill="none" stroke={accent} strokeWidth="2" />
              <path d="M34 16 h46" stroke={accent} strokeWidth="2" />
              <circle cx="96" cy="16" r="16" fill="none" stroke={accent} strokeWidth="2" strokeOpacity="0.8" />
              <path d="M112 8 l38 -22 M112 24 l38 22" stroke={accent} strokeWidth="2" strokeOpacity="0.6" />
              <circle cx="166" cy="-18" r="10" fill={accent} fillOpacity="0.8" />
              <circle cx="166" cy="50" r="10" fill="none" stroke={accent} strokeWidth="2" strokeOpacity="0.5" />
            </g>
          </g>
        )}

        {project.motif === "tenants" && (
          <g fill="none" stroke={accent}>
            {[0, 1, 2].map((n) =>
              [0, 1, 2, 3].map((r) => (
                <rect
                  key={`${n}-${r}`}
                  x={196 + r * 44}
                  y={50 + n * 44}
                  width="34"
                  height="34"
                  rx="7"
                  strokeWidth="1.6"
                  strokeOpacity={0.25 + ((n + r) % 3) * 0.25}
                  fill={(n + r) % 4 === 0 ? accent : "none"}
                  fillOpacity="0.25"
                />
              ))
            )}
            <path d="M188 200 h190" strokeWidth="2" strokeOpacity="0.7" />
            <path d="M188 214 h190" strokeWidth="1" strokeOpacity="0.3" />
          </g>
        )}

        {project.motif === "soundtrack" && (
          <g fill="none" stroke={accent} strokeOpacity="0.85">
            {[20, 50, 80, 110, 140, 170, 200].map((cx, idx) => (
              <circle
                key={idx}
                cx={290}
                cy={150}
                r={cx * 0.7}
                strokeWidth={1.5}
                strokeOpacity={0.2 + idx * 0.1}
                strokeDasharray={`${idx * 4 + 10} 6`}
              />
            ))}
            <circle cx="290" cy="150" r="18" fill={accent} fillOpacity="0.7" />
          </g>
        )}
      </svg>
    </PaletteBackground>
  );
};
