"use client";

import { ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border py-10">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        {/* Top row: availability + back to top */}
        <div className="flex items-center justify-between gap-4">
          {/* Availability badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent/80" />
            <span className="text-xs text-muted">Available for work</span>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="group inline-flex items-center gap-2 text-xs text-muted hover:text-foreground transition-colors"
          >
            Back to top
            <span className="p-1.5 rounded-full border border-border group-hover:border-foreground/30 group-hover:-translate-y-0.5 transition-all">
              <ArrowUp size={14} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
