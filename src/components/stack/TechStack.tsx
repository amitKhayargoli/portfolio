"use client";

import { motion } from "framer-motion";
import { technologies } from "@/data/technologies";
import { TechIcon } from "./TechIcon";

export function TechStack() {
  return (
    <section id="stack" className="py-6 md:py-8">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        <motion.h2
          className="text-xs uppercase tracking-widest text-muted mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          Current Stack
        </motion.h2>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-8 md:gap-10">
          {technologies.map((tech, index) => (
            <TechIcon key={tech.name} technology={tech} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
