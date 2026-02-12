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

      <main className="min-h-screen text-blueprint-text">

        {/* Main Content Wrapper - Z-Index 10 to scroll OVER the fixed footer */}

        <div className="relative z-10 bg-blueprint-base shadow-2xl mb-[100vh] md:mb-[80vh] w-full">
          <Navigation />

          {/* Hero Section with Parallax (includes About inside TV) */}
          <div className="relative z-10">
            <Hero />
          </div>

          {/* Individual Project Previews - REMOVED scroll-snap-section, CHANGED h-screen to min-h-screen */}
          <div id="projects" className="relative z-0 -mt-[100vh]">
            {projects.map((project, index) => (
              <div key={project.id} className="min-h-screen w-full flex flex-col justify-center overflow-hidden relative py-24 md:py-32">
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


        </div>


        {/* Fixed Footer (Z-0) - revealed when content scrolls up */}
        <Footer />
      </main >
    </>
  );
}
