"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/about/About";
import { ProjectGrid } from "@/components/work/ProjectGrid";
import { TechStack } from "@/components/stack/TechStack";
import { ContributionGraph } from "@/components/github/ContributionGraph";
import { Playground } from "@/components/playground/Playground";
import { Process } from "@/components/contact/Process";
import { Contact } from "@/components/contact/Contact";
import { EasterEggManager } from "@/components/playground/EasterEggManager";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <About />
        <ProjectGrid />
        <ContributionGraph />
        <TechStack />
        <Playground />
        <Process />
        <Contact />
      </main>

      <Footer />

      <EasterEggManager />
    </>
  );
}
