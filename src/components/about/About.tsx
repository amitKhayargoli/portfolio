"use client";

import { motion } from "framer-motion";
import { site } from "@/data/site";

export function About() {
  return (
    <section id="about" className="py-6 md:py-8">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        <div className="max-w-3xl">
          <motion.h2
            className="text-xs uppercase tracking-widest text-muted mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            About
          </motion.h2>

          <motion.p
            className="text-2xl md:text-4xl font-medium leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {site.about.statement}
          </motion.p>

          <motion.p
            className="text-base md:text-lg text-muted leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {site.about.supporting}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
