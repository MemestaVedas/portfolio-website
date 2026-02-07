"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Y2KIcons } from './Y2KIcons';
import MagnifyingTitle from './MagnifyingTitle';
import { OrbitalSystem } from './hero/OrbitalSystem';

/**
 * Hero Dashboard Content
 * The bento-style dashboard that appears inside the CRT TV
 */
export const HeroContent = () => {
    const [isLowPower, setIsLowPower] = useState(false);

    useEffect(() => {
        const lowPower =
            window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
            (navigator.deviceMemory && navigator.deviceMemory < 4) ||
            (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4);
        setIsLowPower(!!lowPower);
    }, []);

    return (
        <div className="relative p-6 md:p-10 lg:p-12">
            {/* Dynamic Orbital System (subtle background) */}
            {!isLowPower && (
                <div className="absolute inset-0 opacity-15 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px]">
                        <OrbitalSystem />
                    </div>
                </div>
            )}

            {/* MAIN BENTO DASHBOARD */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-4">

                {/* 1. CORE MODULES / STACK (Span 6) */}
                <motion.div
                    className="col-span-1 md:col-span-6 p-5 rounded-2xl border border-orange-500/30 bg-orange-500/10 backdrop-blur-sm flex flex-col relative overflow-hidden hover:border-orange-500/50 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <h3 className="text-xs font-mono uppercase tracking-widest text-orange-200/70 mb-4 flex items-center gap-2">
                        <Y2KIcons.Orbit />
                        Core Modules
                    </h3>
                    <div className="grid grid-cols-2 gap-2 flex-1">
                        {[
                            { label: "RUST", color: "text-orange-300", bg: "bg-orange-500/20 border-orange-500/30" },
                            { label: "NEXT.JS", color: "text-blue-200", bg: "bg-blue-500/20 border-blue-500/30" },
                            { label: "TAURI", color: "text-cyan-200", bg: "bg-cyan-500/20 border-cyan-500/30" },
                            { label: "SYSTEMS", color: "text-purple-200", bg: "bg-purple-500/20 border-purple-500/30" }
                        ].map((tech, i) => (
                            <div key={tech.label} className={`flex items-center justify-center p-2 rounded-lg border ${tech.bg} hover:bg-white/10 transition-colors`}>
                                <span className={`text-xs font-bold tracking-wider ${tech.color}`}>{tech.label}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-white/5 flex justify-between items-center">
                        <span className="text-[10px] text-white-soft/40 font-mono">MODULES_LOADED</span>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4].map(i => <div key={i} className="w-1 h-3 bg-accent-lime/40 rounded-sm" />)}
                        </div>
                    </div>
                </motion.div>

                {/* 2. SYS DIAGNOSTICS / METRICS (Span 6) */}
                <motion.div
                    className="col-span-1 md:col-span-6 p-5 rounded-2xl border border-rose-500/30 bg-rose-500/10 backdrop-blur-sm relative hover:border-rose-500/50 transition-colors"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <h3 className="text-xs font-mono uppercase tracking-widest text-rose-200/70 mb-4 flex items-center gap-2">
                        <Y2KIcons.Grid />
                        Sys. Diagnostics
                    </h3>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-white-soft/70">Binary Size</span>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-mono text-accent-lime">~7MB</span>
                                <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                                    <div className="w-[10%] h-full bg-accent-lime" />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-white-soft/70">Idle RAM</span>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-mono text-accent-cyan">42MB</span>
                                <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                                    <div className="w-[30%] h-full bg-accent-cyan" />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-white-soft/70">Latency</span>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-mono text-accent-pink">0.3ms</span>
                                <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                                    <div className="w-[80%] h-full bg-accent-pink" />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* 3. ACTIVE MISSIONS / PROJECTS NAV (Span 12) */}
                <motion.div
                    className="col-span-1 md:col-span-12 p-1 rounded-2xl border border-accent-lime/30 bg-accent-lime/10 backdrop-blur-sm relative overflow-hidden group cursor-pointer hover:border-accent-lime/60 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <a href="#projects" className="block h-full w-full p-5 relative z-10">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xs font-mono uppercase tracking-widest text-accent-lime/70 flex items-center gap-2">
                                <Y2KIcons.Star />
                                Active Missions
                            </h3>
                            <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                                <Y2KIcons.Arrow />
                            </div>
                        </div>

                        <div className="flex gap-4 mt-4">
                            <div className="flex-1 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-accent-lime/50 transition-colors group/item">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm font-bold text-white group-hover/item:text-accent-lime transition-colors">YAP</span>
                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white/50">WIP</span>
                                </div>
                                <p className="text-[10px] text-white-soft/60 line-clamp-1">Yet Another Portfolio</p>
                            </div>
                            <div className="flex-1 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-accent-pink/50 transition-colors group/item">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm font-bold text-white group-hover/item:text-accent-pink transition-colors">VIBE-ON</span>
                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-accent-lime/20 text-accent-lime border border-accent-lime/30">LIVE</span>
                                </div>
                                <p className="text-[10px] text-white-soft/60 line-clamp-1">Music Player</p>
                            </div>
                        </div>

                        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-accent-cyan via-accent-lime to-accent-pink opacity-50 group-hover:opacity-100 transition-opacity" />
                    </a>
                </motion.div>
            </div>
        </div>
    );
};

export default HeroContent;
