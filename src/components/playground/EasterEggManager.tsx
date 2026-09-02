"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEasterEgg } from "@/hooks/useEasterEgg";

export function EasterEggManager() {
  const { unlocked, reset } = useEasterEgg();
  const [dismissed, setDismissed] = useState(false);

  const show = unlocked && !dismissed;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="pointer-events-auto bg-background border border-border rounded-2xl p-8 text-center shadow-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <p className="text-2xl font-bold mb-2">🎉 SECRET UNLOCKED</p>
            <p className="text-sm text-muted mb-4">
              You found the Konami code easter egg!
            </p>
            <button
              onClick={() => {
                setDismissed(true);
                reset();
              }}
              className="px-4 py-2 text-sm text-muted hover:text-foreground transition-colors"
            >
              Nice!
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
