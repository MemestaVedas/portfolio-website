"use client";

import Hero from "@/components/Hero";
import SkillsSection from "@/components/SkillsSection";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import OnboardingScreen from "@/components/OnboardingScreen";

import EasterEggOverlay from "@/components/EasterEggOverlay";
import { useKonamiCode } from "@/hooks/useKonamiCode";
import { projects } from "@/data/projects";
import { ParallaxSection, ScrollReveal } from "@/components/ParallaxSection";
import { ProjectPreview } from "@/components/ProjectPreview";
import { motion } from "framer-motion";
import SpaceBackdrop from "@/components/SpaceBackdrop";

export default function Home() {
  const konamiActive = useKonamiCode();

  return (
    <>
      <OnboardingScreen />
      <EasterEggOverlay isActive={konamiActive} />

      <main className="bg-blueprint-base min-h-screen snap-y snap-mandatory text-blueprint-text">
        <Navigation />

        {/* Hero Section with Parallax (includes About inside TV) */}
        <div className="relative z-10">
          <Hero />
        </div>



        {/* Individual Project Previews */}
        <div id="projects" className="relative z-0 -mt-[100vh]">
          {projects.map((project, index) => (
            <div key={project.id} className="h-screen w-full flex flex-col justify-center scroll-snap-section overflow-hidden relative">
              <ScrollReveal direction="up" delay={0.1}>
                <ProjectPreview project={project} />
              </ScrollReveal>

            </div>
          ))}
        </div>



        {/* Skills Section with Staggered Reveal */}
        <div className="scroll-snap-section h-screen w-full overflow-hidden">
          <ParallaxSection
            className="h-full w-full"
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



        {/* Footer with Space Gap */}
        <div className="relative w-full">
          {/* Background for the gap */}
          <div className="absolute inset-0 bg-[#050508] -z-20" />
          <SpaceBackdrop className="opacity-80" />

          {/* Spacer to create the gap (which reveals the background) */}
          <div className="h-32 w-full" />

          <Footer />
        </div>
      </main>
    </>
  );
}
