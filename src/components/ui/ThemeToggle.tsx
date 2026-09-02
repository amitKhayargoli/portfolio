"use client";

import { useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = useCallback(() => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    // Calculate max radius to cover entire viewport
    const corners = [
      { x: 0, y: 0 },
      { x: window.innerWidth, y: 0 },
      { x: 0, y: window.innerHeight },
      { x: window.innerWidth, y: window.innerHeight },
    ];
    const maxRadius = Math.max(
      ...corners.map((c) => Math.sqrt((c.x - originX) ** 2 + (c.y - originY) ** 2))
    );

    // New theme color for the reveal overlay
    const newTheme = theme === "dark" ? "light" : "dark";
    const newBg = newTheme === "dark" ? "#0f172a" : "#f7f7f5";

    // Create overlay with NEW theme color, clipped to small circle
    const overlay = document.createElement("div");
    Object.assign(overlay.style, {
      position: "fixed",
      inset: "0",
      zIndex: "9999",
      pointerEvents: "none",
      backgroundColor: newBg,
      clipPath: `circle(0px at ${originX}px ${originY}px)`,
    });
    document.body.appendChild(overlay);

    // Animate the circle expanding
    const animation = overlay.animate(
      [
        { clipPath: `circle(0px at ${originX}px ${originY}px)` },
        { clipPath: `circle(${maxRadius}px at ${originX}px ${originY}px)` },
      ],
      {
        duration: 750,
        easing: "cubic-bezier(0.76, 0, 0.24, 1)",
        fill: "forwards",
      }
    );

    // Switch theme halfway through (circle covers most of viewport)
    setTimeout(() => {
      toggleTheme();
    }, 375);

    // Remove overlay after animation completes
    animation.onfinish = () => {
      overlay.remove();
    };
  }, [theme, toggleTheme]);

  return (
    <motion.button
      ref={buttonRef}
      onClick={handleClick}
      className="p-2 text-muted hover:text-foreground transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      <AnimatePresence mode="wait">
        {theme === "dark" ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sun size={18} />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Moon size={18} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
