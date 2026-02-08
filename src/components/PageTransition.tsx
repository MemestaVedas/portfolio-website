"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { usePageTransition } from '@/context/PageTransitionContext';

const PageTransition = () => {
    const { phase } = usePageTransition();

    // We want to show the transition overlay if we are closing (leaving) or opening (arriving)
    // but hide it if we are idle.
    const isVisible = phase !== 'idle';

    return (
        <AnimatePresence mode="wait">
            {isVisible && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none overflow-hidden">
                    {/* Background Panels Container */}
                    <div className="absolute inset-0 z-0">
                        {/* Top Half */}
                        <motion.div
                            className="absolute inset-x-0 top-0 h-1/2 bg-blueprint-base origin-top flex flex-col justify-end"
                            // If we are 'opening', we want to start from closed (1).
                            // If we are 'closing', we want to start from open (0).
                            initial={{ scaleY: phase === 'opening' ? 1 : 0 }}
                            animate={{
                                scaleY: phase === 'closing' ? 1 : 0,
                            }}
                            exit={{ scaleY: 0 }}
                            transition={{
                                duration: 1.0,
                                ease: [0.76, 0, 0.24, 1],
                            }}
                            style={{ willChange: "transform" }}
                        >
                            <div
                                className="absolute inset-0 opacity-[0.05]"
                                style={{
                                    backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)`,
                                }}
                            />
                            {/* Split Laser: Top Edge */}
                            <motion.div
                                className="h-[1px] w-full z-20"
                                initial={{ scaleX: 0, opacity: 0 }}
                                animate={{
                                    scaleX: phase === 'closing' ? 1 : 0,
                                    opacity: phase === 'closing' ? 1 : 0,
                                }}
                                transition={{
                                    scaleX: { duration: 0.5, delay: 0.3, ease: [0.23, 1, 0.32, 1] },
                                    opacity: { duration: 0.2, delay: 0.3 },
                                }}
                                style={{
                                    background: 'linear-gradient(90deg, transparent 0%, #C7F000 20%, #C7F000 80%, transparent 100%)',
                                    boxShadow: '0 0 20px #C7F000, 0 0 40px rgba(199, 240, 0, 0.5)',
                                    willChange: "transform, opacity"
                                }}
                            />
                        </motion.div>

                        {/* Bottom Half */}
                        <motion.div
                            className="absolute inset-x-0 bottom-0 h-1/2 bg-blueprint-base origin-bottom flex flex-col justify-start"
                            // If we are 'opening', we want to start from closed (1).
                            // If we are 'closing', we want to start from open (0).
                            initial={{ scaleY: phase === 'opening' ? 1 : 0 }}
                            animate={{
                                scaleY: phase === 'closing' ? 1 : 0,
                            }}
                            exit={{ scaleY: 0 }}
                            transition={{
                                duration: 1.0,
                                ease: [0.76, 0, 0.24, 1],
                            }}
                            style={{ willChange: "transform" }}
                        >
                            <div
                                className="absolute inset-0 opacity-[0.05]"
                                style={{
                                    backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)`,
                                }}
                            />
                            {/* Split Laser: Bottom Edge */}
                            <motion.div
                                className="h-[1px] w-full z-20"
                                initial={{ scaleX: 0, opacity: 0 }}
                                animate={{
                                    scaleX: phase === 'closing' ? 1 : 0,
                                    opacity: phase === 'closing' ? 1 : 0,
                                }}
                                transition={{
                                    scaleX: { duration: 0.5, delay: 0.3, ease: [0.23, 1, 0.32, 1] },
                                    opacity: { duration: 0.2, delay: 0.3 },
                                }}
                                style={{
                                    background: 'linear-gradient(90deg, transparent 0%, #C7F000 20%, #C7F000 80%, transparent 100%)',
                                    boxShadow: '0 0 20px #C7F000, 0 0 40px rgba(199, 240, 0, 0.5)',
                                    willChange: "transform, opacity"
                                }}
                            />
                        </motion.div>
                    </div>

                    {/* Chrome Logo Container - Fade In/Out */}
                    <motion.div
                        className="relative z-50 flex flex-col items-center justify-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                            opacity: phase === 'closing' ? 1 : 0,
                            scale: phase === 'closing' ? 1 : 1.1
                        }}
                        transition={{ duration: 0.5, delay: 0.2 }}
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
                        initial={{ opacity: 0 }}
                        animate={{ opacity: phase === 'closing' ? 1 : 0 }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                    >
                        <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-white-soft/60">
                            system_loading...
                        </span>
                    </motion.div>

                    {/* Scanline overlay (Global over panels) */}
                    <div className="absolute inset-0 z-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay" />
                </div>
            )}
        </AnimatePresence>
    );
};

export default PageTransition;
