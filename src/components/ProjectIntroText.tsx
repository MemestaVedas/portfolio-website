"use client";

import React from 'react';
import { motion } from 'framer-motion';

/**
 * Simple text intro before the CRT morphs to reveal projects
 */
export const ProjectIntroText: React.FC = () => {
    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Background subtle glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-radial from-accent-lime/5 via-transparent to-transparent" />
            </div>

            {/* Text Content */}
            <motion.div
                className="relative z-10 text-center px-8 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
                <motion.div
                    className="mb-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    <span className="inline-block text-accent-lime text-xs md:text-sm font-mono uppercase tracking-[0.3em]">
                        Next Up
                    </span>
                </motion.div>

                <motion.h2
                    className="text-3xl md:text-5xl lg:text-6xl font-display text-white mb-6 leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                >
                    Here are some of the projects I've built
                </motion.h2>

                <motion.div
                    className="flex items-center justify-center gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                >
                    <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/20" />
                    <span className="text-xs md:text-sm font-mono text-white/40 uppercase tracking-widest">
                        Keep scrolling
                    </span>
                    <div className="h-px w-12 bg-gradient-to-l from-transparent to-white/20" />
                </motion.div>

                {/* Scroll hint arrow */}
                <motion.div
                    className="mt-8"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <span className="text-accent-lime text-2xl">↓</span>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ProjectIntroText;
