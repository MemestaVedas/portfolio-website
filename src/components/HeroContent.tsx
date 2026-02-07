"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Y2KIcons } from './Y2KIcons';
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

    const stackGroups = [
        {
            label: 'Core',
            tone: 'text-accent-cyan',
            chips: ['Rust', 'TypeScript', 'React']
        },
        {
            label: 'Ship',
            tone: 'text-accent-lime',
            chips: ['Next.js', 'Tauri', 'Framer']
        },
        {
            label: 'Systems',
            tone: 'text-accent-pink',
            chips: ['Node', 'Postgres', 'Vercel']
        }
    ];

    const projectMissions = [
        {
            name: 'PLAY-ON!',
            status: 'LIVE',
            description: 'Interactive Audio Lab',
            tags: ['Audio', 'WebGL'],
            accent: 'from-accent-cyan/40 via-transparent to-transparent'
        },
        {
            name: 'VIBE-ON',
            status: 'LIVE',
            description: 'Music Player',
            tags: ['Audio', 'Realtime'],
            accent: 'from-accent-lime/40 via-transparent to-transparent'
        },
        {
            name: 'YAP',
            status: 'WIP',
            description: 'Yet Another Portfolio',
            tags: ['Portfolio', 'Systems UI'],
            accent: 'from-accent-pink/40 via-transparent to-transparent'
        }
    ];

    return (
        <div className="relative w-full h-full">
            {/* Neo-retro space field */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {!isLowPower && (
                    <>
                        <div className="absolute inset-0 space-nebula opacity-70" />
                        <div className="absolute inset-0 space-stars opacity-50" />
                        <div className="absolute inset-0 space-dust opacity-30" />
                    </>
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-electric-primary/15 via-transparent to-black/50" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_50%)] opacity-60" />
            </div>

            {!isLowPower && (
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute -top-20 right-0 w-[520px] h-[520px]">
                        <OrbitalSystem />
                    </div>
                </div>
            )}

            {/* MISSION CONTROL DASHBOARD */}
            <div className="relative z-10 h-full w-full pt-6 pb-12 md:pt-10 md:pb-16 lg:pt-12 lg:pb-20 px-6 md:px-10 lg:px-12 grid grid-cols-1 md:grid-cols-12 gap-4">
                <motion.div
                    className="col-span-1 md:col-span-12 px-4 py-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-between"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="flex items-center gap-3">
                        <div className={`w-2.5 h-2.5 rounded-full bg-accent-lime shadow-[0_0_10px_rgba(199,240,0,0.8)] ${isLowPower ? '' : 'animate-pulse'}`} />
                        <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.4em] text-white/60">
                            Mission Control
                        </span>
                        <span className="hidden md:inline-flex text-[10px] font-mono text-white/40">NEO-RETRO CORE</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] md:text-xs font-mono text-white/50">
                        <Y2KIcons.Globe className="w-4 h-4 text-accent-cyan" />
                        <span>ORBIT: STABLE</span>
                    </div>
                </motion.div>

                {/* STACK MATRIX */}
                <motion.div
                    className="col-span-1 md:col-span-5 p-5 rounded-2xl border border-accent-pink/30 bg-white/5 backdrop-blur-sm relative overflow-hidden"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-accent-pink/20 blur-2xl" />
                    <h3 className="text-xs font-mono uppercase tracking-widest text-accent-pink/70 mb-4 flex items-center gap-2">
                        <Y2KIcons.Grid className="w-4 h-4" />
                        Stack Matrix
                    </h3>
                    <div className="space-y-4">
                        {stackGroups.map((group) => (
                            <div key={group.label} className="space-y-2">
                                <div className={`text-[10px] uppercase tracking-[0.3em] font-mono ${group.tone}`}>{group.label}</div>
                                <div className="flex flex-wrap gap-2">
                                    {group.chips.map((chip) => (
                                        <span
                                            key={chip}
                                            className="text-[10px] px-2.5 py-1 rounded-full border border-white/15 bg-white/5 text-white/70 uppercase tracking-wider"
                                        >
                                            {chip}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/40">
                        <span>Stack synced</span>
                        <span className="text-accent-cyan">v2.0</span>
                    </div>
                </motion.div>

                {/* PROJECTS PREVIEW CARD - Rich content with Icons/Stack */}
                <motion.div
                    className="col-span-1 md:col-span-7 md:row-span-2 p-4 rounded-2xl border border-accent-lime/30 bg-white/5 backdrop-blur-sm relative overflow-hidden flex flex-col"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3 relative z-10">
                        <h3 className="text-xs font-mono uppercase tracking-widest text-accent-lime/70 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-lime animate-pulse" />
                            Active Systems
                        </h3>
                        <div className="flex gap-1">
                            <span className="w-1 h-1 rounded-full bg-white/20" />
                            <span className="w-1 h-1 rounded-full bg-white/20" />
                            <span className="w-1 h-1 rounded-full bg-white/20" />
                        </div>
                    </div>

                    {/* Mini Project Grid */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 relative z-10">
                        {/* Project 1: Play-On! */}
                        <div className="group relative p-3 rounded-xl border border-white/10 bg-black/40 hover:border-accent-cyan/30 transition-all overflow-hidden flex flex-col">
                            <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 rounded bg-white/10 border border-white/10 flex items-center justify-center overflow-hidden">
                                    {/* Placeholder for icon if needed, or just color */}
                                    <div className="w-full h-full bg-gradient-to-br from-accent-cyan to-blue-500 opacity-80" />
                                </div>
                                <div className="min-w-0">
                                    <div className="text-sm font-bold text-white truncate">PLAY-ON!</div>
                                    <div className="text-[9px] text-white/50 font-mono">RUST • TAURI</div>
                                </div>
                            </div>

                            <div className="mt-auto grid grid-cols-2 gap-2">
                                <div className="bg-white/5 rounded px-2 py-1">
                                    <div className="text-[8px] text-white/30 uppercase">RAM</div>
                                    <div className="text-xs font-mono text-accent-cyan">-93%</div>
                                </div>
                                <div className="bg-white/5 rounded px-2 py-1">
                                    <div className="text-[8px] text-white/30 uppercase">Lat</div>
                                    <div className="text-xs font-mono text-accent-cyan">0.3ms</div>
                                </div>
                            </div>
                        </div>

                        {/* Project 2: Vibe-On! */}
                        <div className="group relative p-3 rounded-xl border border-white/10 bg-black/40 hover:border-accent-pink/30 transition-all overflow-hidden flex flex-col">
                            <div className="absolute inset-0 bg-gradient-to-br from-accent-pink/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 rounded bg-white/10 border border-white/10 flex items-center justify-center overflow-hidden">
                                    <div className="w-full h-full bg-gradient-to-br from-accent-pink to-purple-500 opacity-80" />
                                </div>
                                <div className="min-w-0">
                                    <div className="text-sm font-bold text-white truncate">VIBE-ON!</div>
                                    <div className="text-[9px] text-white/50 font-mono">KOTLIN • UDP</div>
                                </div>
                            </div>

                            <div className="mt-auto grid grid-cols-2 gap-2">
                                <div className="bg-white/5 rounded px-2 py-1">
                                    <div className="text-[8px] text-white/30 uppercase">Sync</div>
                                    <div className="text-xs font-mono text-accent-pink">&lt;2ms</div>
                                </div>
                                <div className="bg-white/5 rounded px-2 py-1">
                                    <div className="text-[8px] text-white/30 uppercase">Drop</div>
                                    <div className="text-xs font-mono text-accent-pink">0.1%</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                </motion.div>

                {/* SIGNAL RELAY + CTA */}
                <motion.div
                    className="col-span-1 md:col-span-5 p-5 rounded-2xl border border-accent-cyan/30 bg-white/5 backdrop-blur-sm relative overflow-hidden flex flex-col justify-between"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="absolute -top-8 right-0 w-32 h-32 bg-accent-cyan/20 blur-2xl" />
                    <div className="absolute -bottom-10 left-6 w-40 h-20 bg-accent-pink/10 blur-2xl" />
                    <div>
                        <h3 className="text-xs font-mono uppercase tracking-widest text-accent-cyan/70 mb-4 flex items-center gap-2">
                            <Y2KIcons.Chip className="w-4 h-4" />
                            Signal Relay
                        </h3>

                        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(0,240,255,0.18),transparent_55%,rgba(199,240,0,0.18))]" />
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.12),transparent_55%)]" />
                            <div className="relative z-10 px-4 py-4 space-y-3">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-[10px] font-mono uppercase tracking-[0.45em] text-white/40">
                                            Transmission Window
                                        </div>
                                        <div className="text-sm md:text-base font-semibold text-white mt-1">
                                            Collaboration: Select builds
                                        </div>
                                        <div className="text-[11px] text-white/60 mt-1">
                                            Product engineering, systems UI, and performance tuning.
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center gap-1">
                                        <div className="w-10 h-10 rounded-full border border-accent-cyan/40 bg-accent-cyan/10 flex items-center justify-center">
                                            <Y2KIcons.Globe className="w-4 h-4 text-accent-cyan" />
                                        </div>
                                        <span className="text-[9px] font-mono text-white/40">REMOTE</span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-2">
                                    {['Product', 'Systems UI', 'Prototyping', 'Rust + TS'].map((focus) => (
                                        <span key={focus} className="text-[10px] px-2.5 py-0.5 rounded-full border border-white/10 text-white/60">
                                            {focus}
                                        </span>
                                    ))}
                                </div>

                                <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                                    <div className="h-full w-[68%] bg-gradient-to-r from-accent-cyan via-accent-lime to-accent-pink" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 flex items-center gap-3">
                        <a
                            href="#projects"
                            className="flex-1 text-center text-[11px] font-mono uppercase tracking-[0.3em] px-3 py-2 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 transition-colors"
                        >
                            Open Missions
                        </a>
                        <a
                            href="#contact"
                            className="flex-1 text-center text-[11px] font-mono uppercase tracking-[0.3em] px-3 py-2 rounded-full border border-accent-lime/40 text-accent-lime hover:bg-accent-lime/10 transition-colors"
                        >
                            Ping Me
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default HeroContent;
