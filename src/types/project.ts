export interface Project {
  slug: string;
  number: string;
  title: string;
  category: string;
  year: string;
  description: string;
  technologies: string[];
  image: string;
  darkImage?: string;
  lightImage?: string;
  link?: string;
  github?: string;
  screenshots?: string[];
  featured: boolean;
}
