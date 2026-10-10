import React, { useState, useEffect, Suspense, lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";

import { personaProfiles } from "./data/profile";
import { Project } from "./data/projects";
import { CustomCursor } from "./components/CustomCursor";
import { Navbar } from "./components/Navbar";
import { Opening } from "./components/Opening";
import { Profiles } from "./components/Profiles";
import { Hero } from "./sections/Hero";
import { Ribbon } from "./sections/Ribbon";
import { AboutMe } from "./sections/AboutMe";
import { Journey } from "./sections/Journey";
import { Originals } from "./sections/Originals";
import { TopPicks } from "./sections/TopPicks";
import { SkillsMatrix } from "./sections/SkillsMatrix";
import { Achievements } from "./sections/Achievements";
import { FullStory } from "./sections/FullStory";
import { Footer } from "./sections/Footer";

// Modals
import { PlayIntro } from "./components/PlayIntro";
import { ProjectModal } from "./components/ProjectModal";
import { ResumeModal } from "./components/ResumeModal";

export function App() {
  const [phase, setPhase] = useState<"opening" | "profiles" | "home">(() => {
    // If returning user has a stored profile, skip straight to home; otherwise show opening
    const stored = localStorage.getItem("portfolio_visited");
    return stored ? "home" : "opening";
  });

  const [activeProfileId, setActiveProfileId] = useState<string>(() => {
    return localStorage.getItem("portfolio_profile") || "aditya";
  });

  const [introOpen, setIntroOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [resumeOpen, setResumeOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleProfilePick = (id: string) => {
    setActiveProfileId(id);
    localStorage.setItem("portfolio_profile", id);
    localStorage.setItem("portfolio_visited", "true");
    setPhase("home");

    const p = personaProfiles.find((item) => item.id === id);
    if (p) {
      setToastMessage(`Switched to ${p.name} profile — view reordered`);
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  const handleReplayIntro = () => {
    setPhase("opening");
  };

  const currentPersona =
    personaProfiles.find((p) => p.id === activeProfileId) || personaProfiles[0];
  const sectionOrder = currentPersona.order;

  // Section component map
  const sectionComponents: Record<string, React.ReactNode> = {
    about: <AboutMe />,
    journey: <Journey />,
    originals: <Originals onOpen={(p) => setSelectedProject(p)} />,
    picks: <TopPicks />,
    skills: <SkillsMatrix />,
    moments: <Achievements />,
    story: <FullStory onView={() => setResumeOpen(true)} />,
  };

  return (
    <div className="relative min-h-screen bg-ink text-bone font-sans">
      {/* Cinematic Film Grain Overlay */}
      <div className="grain" aria-hidden="true" />

      {/* Custom Contextual Cursor */}
      <CustomCursor />

      {/* Cinematic Transitions: Opening & Profiles */}
      <AnimatePresence mode="wait">
        {phase === "opening" && (
          <Opening onDone={() => setPhase("profiles")} key="opening" />
        )}
        {phase === "profiles" && (
          <Profiles onPick={handleProfilePick} key="profiles" />
        )}
      </AnimatePresence>

      {/* Main Streaming Platform Home */}
      {phase === "home" && (
        <motion.div
          initial={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.9 }}
        >
          {/* Top Sticky Navigation */}
          <Navbar
            order={sectionOrder}
            profileId={activeProfileId}
            onSwitch={handleProfilePick}
            onResume={() => setResumeOpen(true)}
          />

          <main id="main-content">
            {/* Hero Billboard */}
            <Hero
              key={`hero-${activeProfileId}`}
              onPlay={() => setIntroOpen(true)}
              onResume={() => setResumeOpen(true)}
              profileId={activeProfileId}
            />

            {/* Continue Exploring Ribbon Rail */}
            <Ribbon order={sectionOrder} />

            {/* Dynamically Curated Sections */}
            {sectionOrder.map((sectionId) => (
              <div key={sectionId} id={sectionId}>
                {sectionComponents[sectionId]}
              </div>
            ))}

            {/* Footer with Replay Option */}
            <Footer onReplay={handleReplayIntro} />
          </main>
        </motion.div>
      )}

      {/* Interactive Modals */}
      <AnimatePresence>
        {introOpen && (
          <PlayIntro onClose={() => setIntroOpen(false)} key="play-intro" />
        )}
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            onSwitch={(proj) => setSelectedProject(proj)}
            key="project-modal"
          />
        )}
        {resumeOpen && (
          <ResumeModal onClose={() => setResumeOpen(false)} key="resume-modal" />
        )}
      </AnimatePresence>

      {/* Persona Switch Notification Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            role="status"
            className="glass fixed bottom-6 left-1/2 z-[150] w-[min(92vw,420px)] -translate-x-1/2 rounded-xl px-5 py-3 text-center text-xs font-semibold text-bone shadow-2xl border border-white/20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
