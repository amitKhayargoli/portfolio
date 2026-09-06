"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { VinylPlayer } from "@/components/playground/VinylPlayer";
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
        {/* <About /> */}
        <TechStack />
        <ContributionGraph />
        <ProjectGrid />
        {/* <Playground /> */}
        {/* <Process /> */}
        <Contact />
      </main>

      <Footer />

      {/* Hidden easter egg: vinyl music player */}
      <VinylPlayer />

      <EasterEggManager />
    </>
  );
}
