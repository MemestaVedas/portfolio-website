"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CRTMorphTransition, CRT_ORGANIC_EASE } from './CRTMorphTransition';
import HeroContent from './HeroContent';

/**
 * Demo: CRT Morph Transition
 * 
 * This file demonstrates how to use the CRTMorphTransition component
 * with your existing Mission Control dashboard content.
 * 
 * The transition happens when:
 * 1. User clicks anywhere on the CRT frame
 * 2. Or after the autoTriggerDelay (if set)
 * 3. Or when isExpanded prop changes externally
 */

// ============================================================================
// WEBSITE CONTENT PLACEHOLDER
// ============================================================================

/**
 * This represents your full website content that appears after the morph.
 * Replace this with your actual website layout/content.
 */
const WebsiteMainContent: React.FC = () => {
    return (
        <div className="w-full min-h-screen bg-blueprint-base">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-electric-dark/50 via-blueprint-base to-blueprint-base" />

                {/* Decorative elements */}
                <div className="absolute inset-0 space-nebula opacity-30" />
                <div className="absolute inset-0 space-stars opacity-20" />

                {/* Content */}
                <motion.div
                    className="relative z-10 text-center px-8 max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3, ease: CRT_ORGANIC_EASE }}
                >
                    <motion.span
                        className="inline-block text-accent-lime font-mono text-sm uppercase tracking-[0.5em] mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        Welcome to the System
                    </motion.span>

                    <motion.h1
                        className="text-5xl md:text-7xl lg:text-8xl font-display text-white mb-6"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        Full Website
                        <span className="block text-chrome-gradient">Experience</span>
                    </motion.h1>

                    <motion.p
                        className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                    >
                        The CRT frame has expanded to reveal the full website.
                        This content slides up from below as the frame morphs into the viewport.
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1 }}
                    >
                        <button className="px-8 py-3 rounded-full bg-accent-lime text-console-dark font-mono text-sm uppercase tracking-widest hover:bg-accent-lime/90 transition-colors">
                            Explore
                        </button>
                        <button className="px-8 py-3 rounded-full border border-white/20 text-white font-mono text-sm uppercase tracking-widest hover:bg-white/10 transition-colors">
                            Learn More
                        </button>
                    </motion.div>
                </motion.div>
            </section>

            {/* Projects Section Preview */}
            <section className="py-24 px-8 bg-console-dark/50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-display text-white mb-12">
                        Featured Projects
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <motion.div
                                key={i}
                                className="group relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-accent-cyan/30 transition-colors overflow-hidden"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent-cyan/10 rounded-full blur-3xl group-hover:bg-accent-cyan/20 transition-colors" />
                                <div className="relative z-10">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-cyan/20 to-accent-pink/20 flex items-center justify-center mb-4">
                                        <span className="text-2xl">🚀</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">Project {i}</h3>
                                    <p className="text-sm text-white/60 mb-4">
                                        A showcase project demonstrating the capabilities of the system.
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/70">React</span>
                                        <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/70">TypeScript</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

// ============================================================================
// DEMO COMPONENT
// ============================================================================

export const CRTMorphDemo: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="relative min-h-screen bg-blueprint-base">
            {/* Background that shows through during morph */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-radial from-electric-dark/30 via-blueprint-base to-blueprint-base" />
                <div className="absolute inset-0 space-stars opacity-30" />
            </div>

            {/* The CRT Morph Transition */}
            <CRTMorphTransition
                crtContent={<HeroContent />}
                websiteContent={<WebsiteMainContent />}
                isExpanded={isExpanded}
                onExpandChange={setIsExpanded}
                enableScanlines={true}
                enableCurvature={true}
                morphDuration={1.2}
            // Set autoTriggerDelay to enable auto-expansion after N ms
            // autoTriggerDelay={3000}
            />

            {/* Trigger button (for testing) */}
            {!isExpanded && (
                <motion.div
                    className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                >
                    <button
                        onClick={() => setIsExpanded(true)}
                        className="px-6 py-3 rounded-full bg-accent-lime/20 border border-accent-lime/40 text-accent-lime font-mono text-xs uppercase tracking-widest hover:bg-accent-lime/30 transition-colors"
                    >
                        Click to Expand • or Click the TV
                    </button>
                </motion.div>
            )}

            {/* Reset button (when expanded) */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        className="fixed top-8 right-8 z-[60]"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ delay: 0.5, duration: 0.3 }}
                    >
                        <button
                            onClick={() => setIsExpanded(false)}
                            className="w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                        >
                            ✕
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CRTMorphDemo;
