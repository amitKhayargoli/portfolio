"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  href?: string;
  onClick?: () => void;
}

export function Button({
  children,
  variant = "primary",
  className,
  href,
  onClick,
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium transition-all duration-200 rounded-full";

  const variantClasses = {
    primary:
      "bg-foreground text-background hover:opacity-90",
    secondary:
      "border border-border text-foreground hover:bg-card",
    ghost:
      "text-muted hover:text-foreground",
  };

  const classes = cn(baseClasses, variantClasses[variant], className);

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
