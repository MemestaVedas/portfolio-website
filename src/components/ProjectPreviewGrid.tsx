"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { projects } from '@/data/projects';
import Image from 'next/image';

/**
 * Compact project preview grid designed to fit inside the CRT frame
 * Shows before the morph transition to the full projects section
 */
export const ProjectPreviewGrid: React.FC = () => {
    return (
        <div className="relative w-full h-full">
            {/* Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-electric-primary/10 via-transparent to-black/50" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(199,240,0,0.08),transparent_70%)]" />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full w-full pt-8 pb-12 px-8 md:px-12 flex flex-col">
                {/* Header */}
                <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-accent-lime animate-pulse" />
                            Featured Projects
                        </h2>
                        <span className="text-xs font-mono text-white/40 uppercase tracking-wider">
                            {projects.length} Live
                        </span>
                    </div>
                    <div className="h-px bg-gradient-to-r from-accent-lime/40 via-accent-cyan/20 to-transparent" />
                </motion.div>

                {/* Project Grid */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            className="group relative rounded-xl border border-white/10 bg-black/30 backdrop-blur-sm p-4 hover:border-accent-cyan/30 transition-all overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                        >
                            {/* Gradient accent */}
                            <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 via-transparent to-accent-pink/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                            {/* Icon and Name */}
                            <div className="relative z-10 flex items-start gap-3 mb-3">
                                <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-white/10 flex-shrink-0 bg-white/5">
                                    {project.icon && (
                                        <Image
                                            src={project.icon}
                                            alt={project.name}
                                            fill
                                            className="object-cover"
                                        />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-base font-bold text-white truncate">
                                        {project.name}
                                    </h3>
                                    <p className="text-xs text-white/50 font-mono uppercase tracking-wider">
                                        {project.tech[0]} • {project.tech[1]}
                                    </p>
                                </div>
                            </div>

                            {/* Problem snippet */}
                            <p className="relative z-10 text-xs text-white/60 line-clamp-2 mb-3">
                                {project.problem}
                            </p>

                            {/* Metrics preview */}
                            <div className="relative z-10 flex items-center gap-2">
                                {project.metrics.slice(0, 2).map((metric, i) => (
                                    <div
                                        key={i}
                                        className="flex-1 px-2 py-1.5 rounded bg-white/5 border border-white/10"
                                    >
                                        <div className="text-[9px] font-mono text-white/40 uppercase tracking-wider mb-0.5">
                                            {metric.name}
                                        </div>
                                        <div className="text-sm font-bold text-accent-lime">
                                            {metric.delta}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Hover indicator */}
                            <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="flex items-center gap-1 text-[9px] font-mono text-accent-cyan uppercase tracking-wider">
                                    Scroll for details →
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Footer hint */}
                <motion.div
                    className="mt-6 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5">
                        <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
                            Keep scrolling to explore
                        </span>
                        <span className="text-accent-lime">↓</span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ProjectPreviewGrid;
