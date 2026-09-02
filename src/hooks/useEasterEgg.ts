"use client";

import { useState, useEffect, useCallback } from "react";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
];

export function useEasterEgg() {
  const [unlocked, setUnlocked] = useState(false);
  const [sequence, setSequence] = useState<string[]>([]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (unlocked) return;

      const newSequence = [...sequence, e.key].slice(-KONAMI_CODE.length);
      setSequence(newSequence);

      if (newSequence.length === KONAMI_CODE.length) {
        const match = newSequence.every((key, i) => key === KONAMI_CODE[i]);
        if (match) {
          setUnlocked(true);
          setSequence([]);
        }
      }
    },
    [sequence, unlocked]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return { unlocked, reset: () => { setUnlocked(false); setSequence([]); } };
}
