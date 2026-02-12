"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import CRTFrame from './CRTFrame';
import SpaceBackdrop from './SpaceBackdrop';

interface FixedTVParallaxProps {
    heroContent: React.ReactNode;
    quoteContent: React.ReactNode;
    morphIntroContent: React.ReactNode;
    aboutContent: React.ReactNode;
    decorativeElements?: React.ReactNode;
}

/**
 * Fixed TV Parallax Container with Organic Morph Transition
 * The TV frame stays fixed while content scrolls through it,
 * then morphs organically into the full viewport
 */
export const FixedTVParallax: React.FC<FixedTVParallaxProps> = ({
    heroContent,
    quoteContent,
    morphIntroContent,
    aboutContent,
    decorativeElements
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Track scroll progress through this container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // --- PHASE 1: INTRO (0 - 0.15) ---
    // Text separation and TV entry

    // "My name is" - Move UP and dissolve (faster)
    const introTextY = useTransform(scrollYProgress, [0, 0.09], ['0%', '-100%']);
    const introTextOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

    // "KUSHAL..." - Move DOWN (behind everything) (faster)
    const nameTextY = useTransform(scrollYProgress, [0, 0.15], ['0%', '20%']);
    const nameTextOpacity = useTransform(scrollYProgress, [0.03, 0.11], [1, 0]);
    const nameTextScale = useTransform(scrollYProgress, [0, 0.10], [1, 0.92]);

    // TV Frame - Move UP to center. Locks in place sooner (0.10).
    const tvTranslateY = useTransform(scrollYProgress, [0, 0.10], ['50vh', '0vh']);

    // --- PHASE 2: CONTENT SCROLL (0.15 - 0.70) ---
    // Content slides inside the TV while TV is pinned. 
    // Three equal sections scroll through: Quote → Stats → Project Intro
    // Each gets ~18% of scroll progress for equal viewing time

    const contentY = useTransform(
        scrollYProgress,
        //  Quote In | Quote Ctr | Hero In | Hero HOLD | Text In | Text Out
        [0.15, 0.30, 0.40, 0.75, 0.85, 0.95],
        ['70%', '35%', '0%', '0%', '-35%', '-70%']
    );

    // --- PHASE 3: ORGANIC MORPH / EXPANSION (0.95 - 1.0) ---
    // TV morphs organically to fill viewport with elastic easing

    // Calculate target scale dynamically (viewport / TV frame)
    const tvScaleRaw = useTransform(scrollYProgress, [0.95, 1.0], [1, 25]);

    // Apply spring physics to the scale for organic bouncy feel
    const tvScale = useSpring(tvScaleRaw, {
        stiffness: 60,
        damping: 25,
        mass: 1.2
    });

    // Border radius morphs from rounded to sharp
    const tvBorderRadius = useTransform(scrollYProgress, [0.95, 0.99], [64, 0]);

    // Frame opacity - becomes transparent to reveal content behind
    const frameOpacity = useTransform(scrollYProgress, [0.98, 0.995], [1, 0]);

    // Screen content opacity - fades out the CRT content
    const screenOpacity = useTransform(scrollYProgress, [0.95, 0.99], [1, 0]);

    // Internal content - "scrolling reel" effect: slides up and out
    const internalContentY = useTransform(scrollYProgress, [0.95, 1.0], ['0%', '-100%']);
    const internalContentOpacity = useTransform(scrollYProgress, [0.96, 0.99], [1, 0]);
    const internalContentBlur = useTransform(scrollYProgress, [0.96, 0.99], [0, 12]);

    // Background Opacity - Fades out to reveal content behind
    const bgOpacity = useTransform(scrollYProgress, [0.95, 0.99], [1, 0]);

    // Background elements fade out earlier
    const backgroundY = useTransform(scrollYProgress, [0.05, 0.3], ['0vh', '-100vh']);
    const decorativeY = useTransform(scrollYProgress, [0.05, 0.35], ['0vh', '-120vh']);
    const decorativeOpacity = useTransform(scrollYProgress, [0.2, 0.4], [1, 0]);

    return (
        <div
            ref={containerRef}
            className="relative"
            style={{ height: '400vh' }}
        >
            {/* Sticky Container - Center of Viewport */}
            <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">

                {/* Layer -1: Background Color that fades out */}
                <motion.div
                    className="absolute inset-0 bg-blueprint-base z-0"
                    style={{ opacity: bgOpacity }}
                />

                {/* Layer 0: Background Elements */}
                <motion.div
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{ y: backgroundY, opacity: decorativeOpacity }}
                >
                    <div className="absolute inset-0 bg-electric-primary" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-chrome-gradient opacity-20 blur-3xl rounded-full" />
                    <SpaceBackdrop className="opacity-[0.1]" />
                </motion.div >

                <motion.div
                    className="absolute inset-0 z-10 pointer-events-none"
                    style={{ y: decorativeY, opacity: decorativeOpacity }}
                >
                    {decorativeElements}
                </motion.div>

                {/* Layer 1: INTRO TEXT (My name is) - Above everything initially */}
                <motion.div
                    className="absolute top-[15vh] z-30 text-center"
                    style={{ y: introTextY, opacity: introTextOpacity, willChange: "transform, opacity" }}
                >
                    <h2 className="text-2xl md:text-4xl font-display text-white-soft">
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
                    <h1 className="text-[18vw] md:text-[240px] leading-none font-bold text-white tracking-tighter opacity-10"
                        style={{ fontFamily: 'var(--font-druk)' }}>
                        KUSHAL
                    </h1>
                    <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] md:text-[240px] leading-none font-bold text-transparent stroke-white stroke-2 tracking-tighter opacity-30"
                        style={{ fontFamily: 'var(--font-druk)', WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>
                        KUSHAL
                    </h1>
                </motion.div>

                {/* Layer 3: TV FRAME - The Window with Organic Morph */}
                <motion.div
                    className="relative z-20 w-full flex justify-center"
                    style={{ y: tvTranslateY, willChange: "transform" }}
                >
                    <CRTFrame
                        scale={tvScale as any}
                        screenOpacity={screenOpacity as any}
                        borderRadius={tvBorderRadius as any}
                        frameOpacity={frameOpacity as any}
                    >
                        {/* Internal Content Wrapper - Scrolling Reel Effect */}
                        <motion.div
                            className="w-full flex flex-col"
                            style={{
                                y: contentY,
                                opacity: internalContentOpacity,
                                translateY: internalContentY,
                                willChange: 'transform, opacity'
                            }}
                        >
                            {/* Quote Section */}
                            <div className="h-[500px] md:h-[650px] w-full flex items-stretch justify-center flex-shrink-0">
                                {quoteContent}
                            </div>

                            {/* Hero content - Mission Control (stats) */}
                            <div className="h-[500px] md:h-[650px] w-full flex items-stretch justify-center flex-shrink-0">
                                {heroContent}
                            </div>

                            {/* Morph Intro Text */}
                            <div className="h-[500px] md:h-[650px] w-full flex items-stretch justify-center flex-shrink-0">
                                {morphIntroContent}
                            </div>

                            {/* About content (optional) */}
                            {aboutContent && (
                                <div className="h-[500px] md:h-[650px] w-full flex items-stretch justify-center flex-shrink-0">
                                    {aboutContent}
                                </div>
                            )}
                        </motion.div>
                    </CRTFrame>
                </motion.div>

            </div >

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
