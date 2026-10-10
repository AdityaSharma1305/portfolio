import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProfileAvatar } from "./Profiles";
import { personaProfiles } from "../data/profile";
import { sound } from "../utils/sound";
import { Volume2, VolumeX, Menu, X, FileText } from "lucide-react";

interface NavbarProps {
  order: string[];
  profileId: string;
  onSwitch: (id: string) => void;
  onResume: () => void;
}

const sectionLabels: Record<string, string> = {
  about: "About",
  journey: "Experience",
  originals: "Projects",
  picks: "Highlights",
  skills: "Skills",
  moments: "Achievements",
  story: "Resume"
};

export const MonogramLogo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 28 36" className="h-[1.25em] w-auto" aria-hidden="true">
        {/* Netflix-style Crimson Curved A */}
        <path
          d="M14 4 L4 32 L10 32 L14 18 L18 32 L24 32 Z M14 9 L11.5 16 L16.5 16 Z"
          fill="#e5132b"
        />
        <circle cx="23" cy="6" r="2.5" fill="#ff3d5a" />
      </svg>
      <span className="font-sans text-[0.68em] font-bold tracking-[0.38em] text-mist uppercase">
        SERIES
      </span>
    </span>
  );
};

export const Navbar: React.FC<NavbarProps> = ({
  order,
  profileId,
  onSwitch,
  onResume
}) => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [hidden, setHidden] = useState<boolean>(false);
  const [profileOpen, setProfileOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("top");
  const [soundEnabled, setSoundEnabled] = useState<boolean>(sound.isEnabled());

  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 40);

      if (currentY > 400 && currentY > lastScrollY.current && !profileOpen && !mobileMenuOpen) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [profileOpen, mobileMenuOpen]);

  // Section highlight detection via IntersectionObserver
  useEffect(() => {
    const sectionIds = ["top", ...order, "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [order]);

  // Click outside profile dropdown
  useEffect(() => {
    if (!profileOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [profileOpen]);

  const scrollTo = (id: string) => {
    sound.playClick();
    setMobileMenuOpen(false);
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const offset = 70;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const toggleSound = () => {
    const newState = sound.toggle();
    setSoundEnabled(newState);
  };

  const currentProfile = personaProfiles.find((p) => p.id === profileId) || personaProfiles[0];

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-[60] select-none"
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.4 }}
    >
      <div
        className={`gutter flex h-16 items-center justify-between gap-4 transition-[background,backdrop-filter] duration-500 md:h-[72px] ${
          scrolled || mobileMenuOpen
            ? "bg-ink/90 backdrop-blur-xl border-b border-white/10"
            : "bg-gradient-to-b from-black/80 to-transparent"
        }`}
      >
        {/* Brand Left */}
        <div className="flex items-center gap-6 lg:gap-10">
          <button
            type="button"
            onClick={() => scrollTo("top")}
            className="text-[20px] focus:outline-none"
            aria-label="Back to top"
          >
            <MonogramLogo />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Sections">
            <button
              type="button"
              onClick={() => scrollTo("top")}
              className={`relative text-[13px] font-medium transition ${
                activeSection === "top" ? "text-bone font-semibold" : "text-mist hover:text-bone"
              }`}
            >
              Home
              {activeSection === "top" && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1.5 left-0 right-0 h-[2px] rounded bg-crimson"
                />
              )}
            </button>

            {order.map((secId) => {
              const label = sectionLabels[secId] || secId;
              const isActive = activeSection === secId;
              return (
                <button
                  key={secId}
                  type="button"
                  onClick={() => scrollTo(secId)}
                  className={`relative text-[13px] font-medium transition ${
                    isActive ? "text-bone font-semibold" : "text-mist hover:text-bone"
                  }`}
                >
                  {label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1.5 left-0 right-0 h-[2px] rounded bg-crimson"
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Actions Right */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Sound Toggle */}
          <button
            type="button"
            onClick={toggleSound}
            aria-label={soundEnabled ? "Mute audio" : "Enable sound"}
            title={soundEnabled ? "Sound: On" : "Sound: Off"}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/15 text-bone hover:bg-white/15 transition"
          >
            {soundEnabled ? (
              <Volume2 className="h-4 w-4 text-crimson-2" />
            ) : (
              <VolumeX className="h-4 w-4 text-smoke" />
            )}
          </button>

          {/* View Resume Button */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onResume();
            }}
            className="hidden sm:flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-bone hover:bg-white/20 transition border border-white/10"
          >
            <FileText className="h-3.5 w-3.5 text-crimson-2" />
            Resume
          </button>

          {/* Let's Build Contact CTA */}
          <button
            type="button"
            onClick={() => scrollTo("contact")}
            className="hidden md:block rounded-full border border-white/20 px-4 py-1.5 text-xs font-semibold tracking-[0.14em] text-bone transition hover:border-crimson-2 hover:text-crimson-2 hover:bg-crimson/10"
          >
            LET'S BUILD
          </button>

          {/* Profile Switcher Dropdown */}
          <div className="relative" ref={profileDropdownRef}>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                sound.playClick();
                setProfileOpen((p) => !p);
              }}
              aria-label="Switch persona profile"
              className="group flex items-center gap-2 rounded-full p-1 transition hover:ring-2 hover:ring-white/40 focus:outline-none"
            >
              <ProfileAvatar id={profileId} size="sm" />
              <span className="hidden text-xs font-semibold text-bone xl:block">
                {currentProfile.name}
              </span>
              <span className="text-[10px] text-smoke transition-transform duration-300 group-hover:translate-y-0.5">
                ▼
              </span>
            </button>

            {/* Profile Menu Popover */}
            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-12 w-56 rounded-xl bg-ink-2 p-2 shadow-2xl border border-white/10 backdrop-blur-xl"
                >
                  <p className="px-3 py-1.5 text-[10px] font-bold tracking-widest text-smoke uppercase">
                    Switch Profile
                  </p>
                  <div className="space-y-1">
                    {personaProfiles.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => {
                          sound.playClick();
                          onSwitch(p.id);
                          setProfileOpen(false);
                        }}
                        className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition ${
                          p.id === profileId
                            ? "bg-white/15 text-white"
                            : "text-mist hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <ProfileAvatar id={p.id} size="sm" />
                        <div>
                          <p className="text-xs font-bold text-bone">{p.name}</p>
                          <p className="text-[10px] text-mist leading-tight">{p.blurb}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setMobileMenuOpen((m) => !m);
            }}
            className="flex h-9 w-9 items-center justify-center rounded-md text-bone lg:hidden"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-b border-white/10 bg-ink/95 backdrop-blur-2xl px-6 py-6"
          >
            <nav className="flex flex-col gap-4">
              <button
                type="button"
                onClick={() => scrollTo("top")}
                className="text-left text-lg font-bold text-bone"
              >
                Home
              </button>
              {order.map((secId) => (
                <button
                  key={secId}
                  type="button"
                  onClick={() => scrollTo(secId)}
                  className="text-left text-base font-semibold text-mist hover:text-bone"
                >
                  {sectionLabels[secId] || secId}
                </button>
              ))}
              <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onResume();
                  }}
                  className="flex items-center justify-center gap-2 rounded-lg bg-bone py-3 text-sm font-bold text-ink"
                >
                  <FileText className="h-4 w-4" />
                  View Resume
                </button>
                <button
                  type="button"
                  onClick={() => scrollTo("contact")}
                  className="flex items-center justify-center gap-2 rounded-lg border border-white/20 py-3 text-sm font-semibold text-bone"
                >
                  Let's Build
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
