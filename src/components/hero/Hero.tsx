"use client";

import { motion } from "framer-motion";
import { FileText, Mail } from "lucide-react";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { site } from "@/data/site";
import { useMousePosition } from "@/hooks/useMousePosition";
import { Magnetic } from "@/components/ui/Magnetic";

export function Hero() {
  const mouse = useMousePosition();

  return (
    <section className="min-h-screen flex items-center pt-20 pb-16">
      <div className="max-w-3xl mx-auto px-6 md:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-start">
          {/* Profile Image */}
          <motion.div
            className="relative"
            style={{
              x: mouse.x * 6,
              y: mouse.y * 6,
            }}
          >
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-card border border-border overflow-hidden">
              {/* Replace with your profile image */}
              {/* <div className="w-full h-full bg-gradient-to-br from-card to-muted/20 flex items-center justify-center">
                <span className="text-3xl md:text-4xl font-bold text-foreground/20">
                  AK
                </span>
              </div> */}
              <img
                src="pfp.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Availability indicator */}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-accent border-2 border-background" />
          </motion.div>

          {/* Content */}
          <div className="space-y-6">
            <div>
              <motion.h1
                className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              >
                {site.fullName}
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl text-muted mt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.1,
                  ease: [0.76, 0, 0.24, 1],
                }}
              >
                {site.title}
              </motion.p>
              <motion.p
                className="text-sm text-muted/70 mt-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.15,
                  ease: [0.76, 0, 0.24, 1],
                }}
              >
                {site.location}
              </motion.p>
            </div>

            <motion.p
              className="text-base md:text-lg text-muted max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: [0.76, 0, 0.24, 1],
              }}
            >
              {site.description}
            </motion.p>

            {/* Social Links */}
            <motion.div
              className="flex items-center gap-4 pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.3,
                ease: [0.76, 0, 0.24, 1],
              }}
            >
              <Magnetic>
                <a
                  href={site.resume}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium border border-border rounded-full text-foreground hover:bg-card transition-colors"
                >
                  <FileText size={16} />
                  Resume
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 text-muted hover:text-foreground transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn size={20} />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 text-muted hover:text-foreground transition-colors"
                  aria-label="GitHub"
                >
                  <FaGithub size={20} />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href={`mailto:${site.email}`}
                  className="p-2.5 text-muted hover:text-foreground transition-colors"
                  aria-label="Email"
                >
                  <Mail size={20} />
                </a>
              </Magnetic>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
