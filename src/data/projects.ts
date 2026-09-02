import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "bookshelf",
    number: "01",
    title: "BookShelf",
    category: "E-commerce",
    year: "2026",
    description:
      "A modern e-commerce platform for discovering and purchasing books with a clean, focused interface.",
    technologies: ["Next.js", "Express", "MongoDB", "Prisma"],
    image: "/projects/bookshelf/cover.webp",
    featured: true,
  },
  {
    slug: "dailo",
    number: "02",
    title: "Dailo",
    category: "Productivity",
    year: "2025",
    description:
      "A minimal daily journal and task management app built for focused, distraction-free productivity.",
    technologies: ["React", "Node.js", "Supabase", "Tailwind CSS"],
    image: "/projects/dailo/cover.webp",
    featured: true,
  },
  {
    slug: "linkin",
    number: "03",
    title: "LinkIn",
    category: "Social",
    year: "2025",
    description:
      "A curated link-sharing platform for developers to showcase their best work in one place.",
    technologies: ["Next.js", "TypeScript", "Prisma", "Tailwind CSS"],
    image: "/projects/linkin/cover.webp",
    featured: true,
  },
];
