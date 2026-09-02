export interface Technology {
  name: string;
  icon: string;
  description: string;
}

export const technologies: Technology[] = [
  { name: "Next.js", icon: "nextdotjs", description: "Used for modern full-stack applications." },
  { name: "React", icon: "react", description: "Component-based UI library." },
  { name: "TypeScript", icon: "typescript", description: "Type-safe JavaScript development." },
  { name: "Node.js", icon: "node-dot-js", description: "Server-side JavaScript runtime." },
  { name: "Express", icon: "express", description: "Minimal Node.js web framework." },
  { name: "Tailwind CSS", icon: "tailwindcss", description: "Utility-first CSS framework." },
  { name: "Supabase", icon: "supabase", description: "Open-source Firebase alternative." },
  { name: "MongoDB", icon: "mongodb", description: "NoSQL document database." },
  { name: "HTML5", icon: "html5", description: "Standard markup language for the web." },
  { name: "CSS3", icon: "css3", description: "Stylesheet language for presentation." },
  { name: "Prisma", icon: "prisma", description: "Next-generation Node.js ORM." },
  { name: "Git", icon: "git", description: "Distributed version control system." },
];
