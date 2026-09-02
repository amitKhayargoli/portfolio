"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <a href={`/work/${project.slug}`} className="block">
          {/* Project Number */}
          <p className="text-xs text-muted font-mono mb-3">{project.number}</p>

          {/* Project Title */}
          <h3 className="text-xl md:text-2xl font-bold mb-1">{project.title}</h3>
          <p className="text-sm text-muted mb-4">{project.category}</p>

          {/* Project Image */}
          <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-card border border-border mb-4">
            <div className="absolute inset-0 bg-gradient-to-br from-card to-muted/10 flex items-center justify-center">
              <span className="text-sm text-muted/50 uppercase tracking-wider">
                {project.title}
              </span>
            </div>
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-xs px-2.5 py-1 rounded-full border border-border text-muted"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* View Link */}
          <div className="flex items-center gap-2 text-sm text-muted group-hover:text-foreground transition-colors">
            <span>View Project</span>
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </div>
        </a>
    </motion.div>
  );
}
