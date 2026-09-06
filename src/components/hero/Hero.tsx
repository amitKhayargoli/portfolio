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
    <section className="pt-20">
      <div className="mx-auto w-full max-w-3xl px-6 md:px-8">
        {/* Profile */}
        <div className="flex items-center gap-5 md:gap-6">
          <motion.div
            className="relative shrink-0"
            animate={{
              x: mouse.x * 4,
              y: mouse.y * 4,
            }}
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 18,
              mass: 0.4,
            }}
          >
            <div className="h-20 w-20 overflow-hidden rounded-xl border border-border bg-card md:h-24 md:w-24">
              <img
                src="/pfp.jpg"
                alt="Amit Khayargoli"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Availability */}
            <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-background bg-accent" />
          </motion.div>

          {/* Identity */}
          <div>
            <motion.h1
              className="text-2xl font-bold tracking-tight md:text-3xl"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                ease: [0.76, 0, 0.24, 1],
              }}
            >
              {site.fullName}
            </motion.h1>

            <motion.p
              className="mt-1 text-base text-muted md:text-lg"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.05,
                ease: [0.76, 0, 0.24, 1],
              }}
            >
              {site.title}
            </motion.p>

            <motion.p
              className="mt-0.5 text-sm text-muted/70"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.1,
                ease: [0.76, 0, 0.24, 1],
              }}
            >
              {site.location}
            </motion.p>
          </div>
        </div>

        {/* Description */}
        <motion.p
          className="mt-7 max-w-2xl text-base leading-7 text-muted md:text-[17px]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.15,
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          {site.description}
        </motion.p>

        {/* Actions */}
        <motion.div
          className="mt-6 flex items-center gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.2,
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          {/* Resume */}
          <Magnetic>
            <a
              href={site.resume}
              className="
                inline-flex items-center gap-2
                rounded-md
                bg-foreground
                px-4 py-2.5
                text-sm font-medium
                text-background
                transition-all duration-200
                hover:opacity-85
                mr-1
              "
            >
              <FileText size={16} />
              Resume
            </a>
          </Magnetic>

          {/* LinkedIn */}
          <Magnetic>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="
                rounded-md p-2.5
                text-muted
                transition-colors duration-200
                hover:text-foreground
              "
              aria-label="LinkedIn"
            >
              <FaLinkedinIn size={19} />
            </a>
          </Magnetic>

          {/* GitHub */}
          <Magnetic>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="
                rounded-md p-2.5
                text-muted
                transition-colors duration-200
                hover:text-foreground
              "
              aria-label="GitHub"
            >
              <FaGithub size={19} />
            </a>
          </Magnetic>

          {/* Email */}
          <Magnetic>
            <a
              href={`mailto:${site.email}`}
              className="
                rounded-md p-2.5
                text-muted
                transition-colors duration-200
                hover:text-foreground
              "
              aria-label="Email"
            >
              <Mail size={19} />
            </a>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}
