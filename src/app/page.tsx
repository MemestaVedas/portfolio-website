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
import { ParallaxSection, ScrollReveal } from "@/components/ParallaxSection";
import { motion } from "framer-motion";

export default function Home() {
  const konamiActive = useKonamiCode();

  return (
    <>
      <OnboardingScreen />
      <EasterEggOverlay isActive={konamiActive} />

      <main className="bg-blueprint-base min-h-screen scroll-snap-proximity">
        <Navigation />

        {/* Hero Section with Parallax (includes About inside TV) */}
        <div className="scroll-snap-section">
          <Hero />
        </div>

        <SectionDivider variant="laser" />

        {/* Individual Project Deep Dives */}
        <div id="projects">
          {projects.map((project, index) => (
            <div key={project.id} className="scroll-snap-section">
              <ParallaxSection
                id={project.id}
                bgLayers={[
                  {
                    speed: 0.1,
                    className: "opacity-30",
                    content: (
                      <div className="absolute inset-0 bg-gradient-to-b from-electric-primary/5 to-transparent" />
                    )
                  }
                ]}
              >
                <ScrollReveal direction="up" delay={0.1}>
                  <ProjectDeepDive project={project} />
                </ScrollReveal>
              </ParallaxSection>
              {index < projects.length - 1 && (
                <SectionDivider variant="constellation" />
              )}
            </div>
          ))}
        </div>

        <SectionDivider variant="chrome" />

        {/* Skills Section with Staggered Reveal */}
        <div className="scroll-snap-section">
          <ParallaxSection
            id="architecture"
            bgLayers={[
              {
                speed: 0.15,
                className: "opacity-20",
                content: (
                  <div className="absolute inset-0 bg-gradient-to-tr from-accent-cyan/10 via-transparent to-accent-pink/10" />
                )
              }
            ]}
          >
            <SkillsSection />
          </ParallaxSection>
        </div>

        <SectionDivider variant="grid" />

        {/* Meta Section */}
        <div className="scroll-snap-section">
          <ScrollReveal direction="up" delay={0.05}>
            <MetaSection />
          </ScrollReveal>
        </div>

        <SectionDivider variant="chrome" />

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}

