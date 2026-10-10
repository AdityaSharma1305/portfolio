import React, { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export const CustomCursor: React.FC = () => {
  const [cursorText, setCursorText] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isPointer, setIsPointer] = useState<boolean>(false);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  useEffect(() => {
    // Only activate custom cursor on fine pointers (desktop mouse)
    const isFine = window.matchMedia("(pointer: fine)").matches;
    if (!isFine) return;

    document.body.classList.add("has-custom-cursor");

    const moveHandler = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorTarget) {
        setCursorText(cursorTarget.getAttribute("data-cursor") || "");
      } else {
        setCursorText("");
      }

      const interactive = target.closest("button, a, input, [role='button'], select, textarea");
      setIsPointer(!!interactive);
    };

    const leaveHandler = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", moveHandler);
    window.addEventListener("mouseleave", leaveHandler);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("mouseleave", leaveHandler);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  const hasBadge = cursorText.length > 0;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[999] flex items-center justify-center -translate-x-1/2 -translate-y-1/2 will-change-transform"
      style={{
        x: cursorX,
        y: cursorY,
      }}
    >
      {hasBadge ? (
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.6, opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="flex items-center justify-center rounded-full bg-crimson px-3 py-1.5 text-[11px] font-bold tracking-widest text-white shadow-lg uppercase backdrop-blur-md"
        >
          {cursorText}
        </motion.div>
      ) : (
        <motion.div
          animate={{
            scale: isPointer ? 1.6 : 1,
            backgroundColor: isPointer ? "rgba(255, 61, 90, 0.4)" : "rgba(244, 241, 236, 0.2)",
            borderColor: isPointer ? "#ff3d5a" : "rgba(244, 241, 236, 0.6)"
          }}
          transition={{ duration: 0.12 }}
          className="h-8 w-8 rounded-full border border-bone/60"
        />
      )}
    </motion.div>
  );
};
