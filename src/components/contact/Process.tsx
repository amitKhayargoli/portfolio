"use client";

import { motion } from "framer-motion";
import { site } from "@/data/site";

export function Process() {
  return (
    <section className="py-6 md:py-8">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        <motion.h2
          className="text-xs uppercase tracking-widest text-muted mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          How I Work
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {site.process.map((item, index) => (
            <motion.div
              key={item.step}
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <p className="text-xs text-accent font-mono">{item.step}</p>
              <h3 className="text-lg font-medium">{item.title}</h3>
              <p className="text-sm text-muted">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
