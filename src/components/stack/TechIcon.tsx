"use client";

import { motion } from "framer-motion";
import { Technology } from "@/data/technologies";
import { Magnetic } from "@/components/ui/Magnetic";
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
} from "react-icons/si";
import { TbBrandHtml5, TbBrandCss3 } from "react-icons/tb";

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  nextdotjs: SiNextdotjs,
  react: SiReact,
  typescript: SiTypescript,
  "node-dot-js": SiNodedotjs,
  express: SiExpress,
  tailwindcss: SiTailwindcss,
  supabase: SiSupabase,
  mongodb: SiMongodb,
  prisma: SiPrisma,
  git: SiGit,
  html5: TbBrandHtml5,
  css3: TbBrandCss3,
};

interface TechIconProps {
  technology: Technology;
  index: number;
}

export function TechIcon({ technology, index }: TechIconProps) {
  const Icon = iconMap[technology.icon] || SiReact;

  return (
    <Magnetic strength={0.12}>
      <motion.div
        className="flex flex-col items-center gap-3 cursor-default"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.05 }}

      >
        <motion.div
          className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center text-muted hover:text-foreground transition-colors"
          whileHover={{ scale: 1.1 }}
        >
          <Icon size={32} />
        </motion.div>
        <span className="text-xs text-muted">{technology.name}</span>


      </motion.div>
    </Magnetic>
  );
}
