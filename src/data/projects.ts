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
    technologies: ["Next.js", "TypeScript", "Docker", "MongoDB"],
    image: "/projects/bookshelf/cover.png",
    github: "https://github.com/amitKhayargoli/Book-Ecommerce",
    featured: true,
  },
  {
    slug: "dailo",
    number: "02",
    title: "Dailo",
    category: "Food Delivery",
    year: "2025",
    description:
      "A food delivery application built with a smooth, intuitive interface for ordering meals from local restaurants.",
    technologies: ["Flutter", "Next.js", "Supabase"],
    image: "/projects/dailo/cover.png",
    screenshots: [
      "/projects/dailo/food-details.png",
      "/projects/dailo/pizza-point.png",
    ],
    github: "https://github.com/amitKhayargoli/FoodDelivery",
    featured: true,
  },
  {
    slug: "flowdomain",
    number: "03",
    title: "Flow Domain",
    category: "Project Management",
    year: "2025",
    description:
      "A project management system built in React and PostgreSQL for organizing tasks, tracking progress, and managing workflows.",
    technologies: ["React", "PostgreSQL", "JavaScript"],
    image: "/projects/flowdomain/cover.png",
    github: "https://github.com/amitKhayargoli/flowdomainProjectManagement",
    featured: true,
  },
  {
    slug: "motionai",
    number: "04",
    title: "MotionAI",
    category: "Productivity",
    year: "2025",
    description:
      "A productivity platform that seamlessly converts meeting recordings into structured notes using AI.",
    technologies: ["Next.js", "TypeScript", "MongoDB"],
    image: "/projects/motionai/cover.png",
    github: "https://github.com/amitKhayargoli/MotionAI",
    featured: true,
  },
  {
    slug: "daraz-price-tracker",
    number: "05",
    title: "Daraz Price Tracker",
    category: "Web Tool",
    year: "2025",
    description:
      "A price tracking tool for Daraz that monitors product prices and notifies users of price drops.",
    technologies: ["Next.js", "TypeScript", "Firecrawl", "Supabase"],
    image: "/projects/priceTracker/cover.png",
    github: "https://github.com/amitKhayargoli/DealDrop",
    link: "https://dealdrop-v1.vercel.app",
    featured: true,
  },
];
