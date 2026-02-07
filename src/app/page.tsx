"use client";

import Hero from "@/components/Hero";
import ProjectDeepDive from "@/components/ProjectDeepDive";
import SkillsSection from "@/components/SkillsSection";
import MetaSection from "@/components/MetaSection";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import OnboardingScreen from "@/components/OnboardingScreen";
import { SectionDivider } from "@/components/SectionDivider";
import AboutSection from "@/components/AboutSection";
import EasterEggOverlay from "@/components/EasterEggOverlay";
import { useKonamiCode } from "@/hooks/useKonamiCode";
import { projects } from "@/data/projects";

export default function Home() {
  const konamiActive = useKonamiCode();

  return (
    <>
      <OnboardingScreen />
      <EasterEggOverlay isActive={konamiActive} />

      <main className="bg-blueprint-base min-h-screen">
        <Navigation />
        <Hero />
        <AboutSection />

        <SectionDivider variant="laser" />

        <div id="projects">
          {projects.map((project, index) => (
            <div key={project.id}>
              <ProjectDeepDive project={project} />
              {index < projects.length - 1 && (
                <SectionDivider variant="constellation" />
              )}
            </div>
          ))}
        </div>

        <SectionDivider variant="chrome" />

        <SkillsSection />

        <SectionDivider variant="grid" />

        <MetaSection />

        <SectionDivider variant="chrome" />

        <Footer />
      </main>
    </>
  );
}
