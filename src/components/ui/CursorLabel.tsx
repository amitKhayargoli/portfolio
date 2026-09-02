"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CursorLabelProps {
  label: string;
  children: ReactNode;
}

export function CursorLabel({ label, children }: CursorLabelProps) {
  return (
    <div className="relative group">
      {children}
      <motion.div
        className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground text-background text-xs rounded-md pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap"
        initial={false}
      >
        {label}
      </motion.div>
    </div>
  );
}
