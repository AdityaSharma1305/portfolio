import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { profile } from "../data/profile";
import { ResumeDocument } from "./ResumeDocument";
import { sound } from "../utils/sound";
import { Download, X, FileText, ExternalLink } from "lucide-react";

interface ResumeModalProps {
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ onClose }) => {
  const [viewMode, setViewMode] = useState<"document" | "pdf">("document");

  useEffect(() => {
    sound.playWhoosh();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[140] flex flex-col bg-black/90 backdrop-blur-md select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label="Resume Modal"
    >
      {/* Top Bar */}
      <div className="gutter flex h-16 shrink-0 items-center justify-between gap-3 pt-[env(safe-area-inset-top)] border-b border-white/10">
        <div className="flex items-center gap-3">
          <p className="truncate font-display text-2xl tracking-wide text-bone">
            The Full Story
          </p>
          <div className="hidden sm:flex items-center gap-1 bg-white/10 rounded-lg p-1 text-xs">
            <button
              type="button"
              onClick={() => setViewMode("document")}
              className={`px-2.5 py-1 rounded font-medium transition ${
                viewMode === "document" ? "bg-bone text-ink font-bold" : "text-mist hover:text-bone"
              }`}
            >
              Document View
            </button>
            <button
              type="button"
              onClick={() => setViewMode("pdf")}
              className={`px-2.5 py-1 rounded font-medium transition ${
                viewMode === "pdf" ? "bg-bone text-ink font-bold" : "text-mist hover:text-bone"
              }`}
            >
              Original PDF
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={profile.resumePdf}
            download="Aditya_Sharma_Resume.pdf"
            className="flex items-center gap-2 rounded-md bg-bone px-4 py-2 text-xs font-bold text-ink transition hover:bg-white hover:shadow-lg"
          >
            <Download className="h-3.5 w-3.5" />
            Download PDF
          </a>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close resume"
            data-cursor="close"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-bone hover:bg-white/20 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <motion.div
        className="gutter flex-1 py-6 overflow-y-auto overscroll-contain"
        data-lenis-prevent="true"
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        {viewMode === "document" ? (
          <div>
            <ResumeDocument />
            <div className="mt-6 flex justify-center pb-6">
              <a
                href={profile.resumePdf}
                target="_blank"
                rel="noreferrer"
                className="glass flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-bone hover:bg-white/15 transition"
              >
                <FileText className="h-4 w-4 text-crimson-2" />
                Open / Print Original PDF
                <ExternalLink className="h-3.5 w-3.5 opacity-60 ml-1" />
              </a>
            </div>
          </div>
        ) : (
          <div className="h-full w-full min-h-[75vh] max-w-5xl mx-auto rounded-xl overflow-hidden bg-white shadow-2xl">
            <iframe
              title="Aditya Sharma resume PDF"
              src={`${profile.resumePdf}#view=FitH`}
              className="h-full w-full min-h-[75vh]"
            />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};
