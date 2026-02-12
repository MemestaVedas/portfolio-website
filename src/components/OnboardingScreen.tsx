"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

import { usePageTransition } from '@/context/PageTransitionContext';

const OnboardingScreen = () => {
    const [phase, setPhase] = useState<'logo' | 'glow' | 'line' | 'split' | 'done'>('logo');
    const { setHasOnboarded } = usePageTransition();

    useEffect(() => {
        const timeline = [
            { phase: 'glow' as const, delay: 500 },
            { phase: 'line' as const, delay: 1400 },
            { phase: 'split' as const, delay: 2000 },
            { phase: 'done' as const, delay: 3000 },
        ];

        const timers = timeline.map(({ phase, delay }) =>
            setTimeout(() => {
                setPhase(phase);
                if (phase === 'done') setHasOnboarded(true);
            }, delay)
        );

        return () => timers.forEach(clearTimeout);
    }, [setHasOnboarded]);

    if (phase === 'done') return null;

    return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none overflow-hidden">
                {/* Background Panels Container */}
                <div className="absolute inset-0 z-0">
                    {/* Top Half */}
                    <motion.div
                        className="absolute inset-x-0 top-0 h-1/2 bg-blueprint-base origin-top flex flex-col justify-end"
                        initial={{ scaleY: 1 }}
                        animate={{
                            scaleY: phase === 'split' ? 0 : 1,
                        }}
                        transition={{
                            duration: 0.9,
                            ease: [0.76, 0, 0.24, 1],
                        }}
                        style={{ willChange: "transform", backfaceVisibility: 'hidden' }}
                    >
                        <div
                            className="absolute inset-0 opacity-[0.05]"
                            style={{
                                backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)`,
                            }}
                        />
                        {/* Split Laser: Top Edge (thinner) */}
                        <motion.div
                            className="h-[1px] w-full z-20"
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{
                                scaleX: (phase === 'line' || phase === 'split') ? 1 : 0,
                                opacity: (phase === 'line' || phase === 'split') ? 1 : 0,
                            }}
                            transition={{
                                scaleX: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                                opacity: { duration: 0.3 },
                            }}
                            style={{
                                background: 'linear-gradient(90deg, transparent 0%, #C7F000 20%, #C7F000 80%, transparent 100%)',
                                boxShadow: '0 0 8px #C7F000, 0 0 16px rgba(199, 240, 0, 0.28)',
                                willChange: "transform, opacity",
                                backfaceVisibility: 'hidden',
                            }}
                        />
                    </motion.div>

                    {/* Bottom Half */}
                    <motion.div
                        className="absolute inset-x-0 bottom-0 h-1/2 bg-blueprint-base origin-bottom flex flex-col justify-start"
                        initial={{ scaleY: 1 }}
                        animate={{
                            scaleY: phase === 'split' ? 0 : 1,
                        }}
                        transition={{
                            duration: 0.9,
                            ease: [0.76, 0, 0.24, 1],
                        }}
                        style={{ willChange: "transform", backfaceVisibility: 'hidden' }}
                    >
                        <div
                            className="absolute inset-0 opacity-[0.05]"
                            style={{
                                backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)`,
                            }}
                        />
                        {/* Split Laser: Bottom Edge (thinner) */}
                        <motion.div
                            className="h-[1px] w-full z-20"
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{
                                scaleX: (phase === 'line' || phase === 'split') ? 1 : 0,
                                opacity: (phase === 'line' || phase === 'split') ? 1 : 0,
                            }}
                            transition={{
                                scaleX: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                                opacity: { duration: 0.3 },
                            }}
                            style={{
                                background: 'linear-gradient(90deg, transparent 0%, #C7F000 20%, #C7F000 80%, transparent 100%)',
                                boxShadow: '0 0 8px #C7F000, 0 0 16px rgba(199, 240, 0, 0.28)',
                                willChange: "transform, opacity",
                                backfaceVisibility: 'hidden',
                            }}
                        />
                    </motion.div>
                </div>

                {/* Chrome Logo Container - Static & Smaller */}
                <motion.div
                    className="relative z-50 flex flex-col items-center justify-center"
                    animate={{ opacity: phase === 'split' ? 0 : 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Logo Image */}
                    <div className="relative w-32 h-32 md:w-56 md:h-56 opacity-95">
                        <Image
                            src="/yellow.png"
                            alt="Kushal Logo"
                            fill
                            className="object-contain"
                            priority
                            sizes="(max-width: 800px) 128px, 224px"
                        />
                    </div>
                </motion.div>

                {/* Loading Text at Bottom */}
                <motion.div
                    className="absolute bottom-16 left-0 right-0 flex justify-center z-50"
                    animate={{ opacity: phase === 'split' ? 0 : 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-white-soft/60">
                        system_loading...
                    </span>
                </motion.div>

                {/* Scanline overlay (inline pattern, no external URL) */}
                <div
                    className="absolute inset-0 z-10 pointer-events-none opacity-[0.04] mix-blend-overlay"
                    style={{
                        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.03) 1px, rgba(255,255,255,0.03) 2px)',
                        backgroundSize: '100% 2px',
                    }}
                />
            </div>
    );
};

export default OnboardingScreen;
