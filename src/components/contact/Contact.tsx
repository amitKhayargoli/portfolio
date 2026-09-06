"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Copy, Check } from "lucide-react";
import { site } from "@/data/site";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(site.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section id="contact" className="py-6 md:py-8">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight whitespace-pre-line">
            {site.contact.heading}
          </h2>
        </motion.div>

        <motion.div
          className="mt-8 flex flex-col sm:flex-row items-start gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-foreground text-background rounded-full hover:opacity-90 transition-opacity"
          >
            Get in Touch
            <ArrowRight size={16} />
          </a>

          <button
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium border border-border rounded-full text-muted hover:text-foreground hover:bg-card transition-all"
          >
            {copied ? (
              <>
                <Check size={16} className="text-accent" />
                Copied
              </>
            ) : (
              <>
                <Copy size={16} />
                Email
              </>
            )}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
