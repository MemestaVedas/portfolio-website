"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import CRTFrame from './CRTFrame';
import SpaceBackdrop from './SpaceBackdrop';

interface FixedTVParallaxProps {
    heroContent: React.ReactNode;
    aboutContent: React.ReactNode;
    decorativeElements?: React.ReactNode;
}

/**
 * Fixed TV Parallax Container
 * The TV frame stays fixed while content scrolls through it
 * Background layers move at different speeds for depth
 */
export const FixedTVParallax: React.FC<FixedTVParallaxProps> = ({
    heroContent,
    aboutContent,
    decorativeElements
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Track scroll progress through this container
    // We increase the height to 400vh to accommodate the multi-stage animation
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // --- PHASE 1: INTRO (0 - 0.25) ---
    // Text separation and TV entry

    // "My name is" - Move UP
    const introTextY = useTransform(scrollYProgress, [0, 0.2], ['0%', '-100%']);
    const introTextOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

    // "KUSHAL..." - Move DOWN (behind everything)
    const nameTextY = useTransform(scrollYProgress, [0, 0.25], ['0%', '20%']);
    const nameTextOpacity = useTransform(scrollYProgress, [0.1, 0.25], [1, 0]);
    const nameTextScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.9]);

    // TV Frame - Move UP to center
    // Starts low (hidden or partially visible), moves to center
    const tvTranslateY = useTransform(scrollYProgress, [0, 0.25], ['40vh', '0vh']);

    // --- PHASE 2: CONTENT SCROLL (0.25 - 0.75) ---
    // Content slides inside the TV while TV is pinned

    const contentY = useTransform(scrollYProgress, [0.25, 0.45, 0.65, 0.75], ['0%', '-50%', '-50%', '-50%']);

    // --- PHASE 3: EXPANSION / EXIT (0.75 - 1.0) ---
    // TV expands to infinity to reveal the next section

    const tvScale = useTransform(scrollYProgress, [0.75, 0.95], [1, 30]);
    const screenOpacity = useTransform(scrollYProgress, [0.8, 0.9], [1, 0]);
    const internalContentOpacity = useTransform(scrollYProgress, [0.75, 0.85], [1, 0]);

    // Background layers
    const backgroundY = useTransform(scrollYProgress, [0, 0.8], ['0%', '100%']);
    const decorativeY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);

    return (
        <div
            ref={containerRef}
            className="relative bg-blueprint-base"
            style={{ height: '400vh' }}
        >
            {/* Sticky Container - Center of Viewport */}
            <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">

                {/* Layer 0: Background Elements */}
                <motion.div
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{ y: backgroundY }}
                >
                    <div className="absolute inset-0 bg-electric-primary" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-chrome-gradient opacity-20 blur-3xl rounded-full" />
                    <SpaceBackdrop className="opacity-[0.1]" />
                </motion.div>

                <motion.div
                    className="absolute inset-0 z-10 pointer-events-none"
                    style={{ y: decorativeY }}
                >
                    {decorativeElements}
                </motion.div>

                {/* Layer 1: INTRO TEXT (My name is) - Above everything initially */}
                <motion.div
                    className="absolute top-[15vh] z-30 text-center"
                    style={{ y: introTextY, opacity: introTextOpacity, willChange: "transform, opacity" }}
                >
                    <h2 className="text-xl md:text-2xl font-mono text-white-soft tracking-widest uppercase">
                        My name is
                    </h2>
                </motion.div>

                {/* Layer 2: NAME TEXT (KUSHAL...) - BEHIND TV */}
                <motion.div
                    className="absolute z-10 text-center flex items-center justify-center"
                    style={{
                        y: nameTextY,
                        opacity: nameTextOpacity,
                        scale: nameTextScale,
                        willChange: "transform, opacity"
                    }}
                >
                    <h1 className="text-[12vw] md:text-[150px] leading-none font-bold text-white tracking-tighter opacity-10"
                        style={{ fontFamily: 'var(--font-druk)' }}>
                        KUSHAL
                    </h1>
                    <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] md:text-[150px] leading-none font-bold text-transparent stroke-white stroke-2 tracking-tighter opacity-30"
                        style={{ fontFamily: 'var(--font-druk)', WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>
                        KUSHAL
                    </h1>
                </motion.div>

                {/* Layer 3: TV FRAME - The Window */}
                <motion.div
                    className="relative z-20 w-full flex justify-center"
                    style={{ y: tvTranslateY, willChange: "transform" }}
                >
                    <CRTFrame
                        scale={tvScale as any}
                        screenOpacity={screenOpacity as any}
                    >
                        {/* Internal Content Wrapper */}
                        <motion.div
                            className="w-full"
                            style={{
                                y: contentY,
                                opacity: internalContentOpacity
                            }}
                        >
                            {/* Hero content */}
                            <div className="h-[500px] md:h-[650px] flex items-center justify-center p-6">
                                {heroContent}
                            </div>

                            {/* About content */}
                            <div className="h-[500px] md:h-[650px] flex items-center justify-center p-6">
                                {aboutContent}
                            </div>
                        </motion.div>
                    </CRTFrame>
                </motion.div>

            </div>

            {/* Scroll indicator */}
            <motion.div
                className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 hidden md:block"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
            >
                <div className="w-5 h-8 border-2 border-white-soft/30 rounded-full flex items-start justify-center p-1.5">
                    <div className="w-1 h-1.5 bg-accent-lime rounded-full" />
                </div>
            </motion.div>
        </div>
    );
};

export default FixedTVParallax;
