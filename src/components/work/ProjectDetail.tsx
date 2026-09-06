"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { FaGithub, FaFire } from "react-icons/fa";
import Link from "next/link";
import { Project } from "@/types/project";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiTailwindcss,
  SiSupabase,
  SiMongodb,
  SiPrisma,
  SiGit,
  SiPostgresql,
  SiJavascript,
  SiDart,
  SiFlutter,
  SiDocker,
} from "react-icons/si";
import { TbBrandHtml5, TbBrandCss3 } from "react-icons/tb";

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  "Next.js": SiNextdotjs,
  React: SiReact,
  TypeScript: SiTypescript,
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  "Tailwind CSS": SiTailwindcss,
  Supabase: SiSupabase,
  MongoDB: SiMongodb,
  Prisma: SiPrisma,
  Git: SiGit,
  HTML5: TbBrandHtml5,
  CSS3: TbBrandCss3,
  PostgreSQL: SiPostgresql,
  JavaScript: SiJavascript,
  Firecrawl: FaFire,
  Dart: SiDart,
  Flutter: SiFlutter,
  Docker: SiDocker,
  "AI/ML": SiReact,
};

interface ProjectDetailProps {
  project: Project;
  prevProject: Project | null;
  nextProject: Project | null;
}

export function ProjectDetail({
  project,
  prevProject,
  nextProject,
}: ProjectDetailProps) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Top nav bar */}
      <div className="max-w-3xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link
          href="/"
          className="text-sm text-muted hover:text-foreground transition-colors flex items-center gap-2"
        >
          <ArrowLeft size={14} />
          Back
        </Link>
        <ThemeToggle />
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 pb-24">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            {project.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-muted">
            <span>{project.category}</span>
            <span className="w-1 h-1 rounded-full bg-muted/50" />
            <span>{project.year}</span>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-card mb-10"
        >
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-fit"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-card to-muted/10 flex items-center justify-center">
              <span className="text-lg text-muted/40 uppercase tracking-wider font-medium">
                {project.title}
              </span>
            </div>
          )}
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10"
        >
          <p className="text-lg leading-relaxed text-muted">
            {project.description}
          </p>
        </motion.div>

        {/* Screenshots */}
        {project.screenshots && project.screenshots.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mb-10"
          >
            <h2 className="text-xs uppercase tracking-widest text-muted mb-5">
              Screenshots
            </h2>
            <div className="flex gap-4 justify-center">
              {project.screenshots.map((src, i) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden w-48 md:w-56"
                >
                  <img
                    src={src}
                    alt={`${project.title} screenshot ${i + 1}`}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-10"
        >
          <h2 className="text-xs uppercase tracking-widest text-muted mb-5">
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-6">
            {project.technologies.map((tech) => {
              const Icon = iconMap[tech] || SiReact;
              return (
                <div key={tech} className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 flex items-center justify-center text-muted hover:text-foreground transition-colors">
                    <Icon size={28} />
                  </div>
                  <span className="text-xs text-muted">{tech}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap gap-3 mb-16"
        >
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-sm text-muted hover:text-foreground hover:border-foreground/30 transition-all"
            >
              <FaGithub size={16} />
              GitHub
            </a>
          )}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <ExternalLink size={16} />
              Live Demo
            </a>
          )}
        </motion.div>

        {/* Prev / Next Navigation */}
        <div className="border-t border-border pt-8 flex items-center justify-between">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug}`}
              className="group flex items-center gap-3 text-sm text-muted hover:text-foreground transition-colors"
            >
              <ArrowLeft
                size={14}
                className="group-hover:-translate-x-1 transition-transform"
              />
              <div>
                <p className="text-xs text-muted/60 mb-0.5">Previous</p>
                <p className="font-medium">{prevProject.title}</p>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group flex items-center gap-3 text-sm text-muted hover:text-foreground transition-colors text-right"
            >
              <div>
                <p className="text-xs text-muted/60 mb-0.5">Next</p>
                <p className="font-medium">{nextProject.title}</p>
              </div>
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </main>
  );
}
