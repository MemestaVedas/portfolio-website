"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter } from 'lucide-react';
import NextImage from 'next/image';
import { Y2KIcons } from './Y2KIcons';
import SpaceBackdrop from './SpaceBackdrop';

import MagnifyingTitle from './MagnifyingTitle';
import ShootingStarUnderline from './ShootingStarUnderline';

// Extracted Components
import { OrbitalSystem } from './hero/OrbitalSystem';
import { FloatingStars } from './hero/FloatingStars';
import { CursorTrail } from './hero/CursorTrail';
import { MetricDisplay, ProofPoint } from './hero/HeroMetrics';

// ============================================
// Y2K DECORATIVE ELEMENTS
// ============================================

// Floating Control Panel Widget
const ControlPanel = ({
    children,
    className = "",
    delay = 0,
    rotation = 0,
    color = "electric-primary"
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    rotation?: number;
    color?: string;
}) => (
    <motion.div
        className={`absolute pointer-events-none ${className}`}
        initial={{ opacity: 0, scale: 0.7, rotate: rotation - 10 }}
        animate={{ opacity: 1, scale: 1, rotate: rotation }}
        transition={{ delay, duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
    >
        <div className={`
            p-4 rounded-2xl backdrop-blur-md
            bg-gradient-to-br from-${color}/30 to-${color}/10
            border border-${color}/40
            shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]
        `}>
            {children}
        </div>
    </motion.div>
);

// Decorative pixel/block cluster (Y2K aesthetic)
const PixelCluster = ({ className = "", delay = 0, vertical = false }: { className?: string; delay?: number; vertical?: boolean }) => (
    <motion.div
        className={`absolute flex ${vertical ? 'flex-col' : 'flex-row'} gap-1 ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay, duration: 0.5 }}
    >
        <div className="w-2.5 h-2.5 bg-accent-coral rounded-sm" />
        <div className="w-2.5 h-2.5 bg-accent-orange rounded-sm" />
        <div className="w-2.5 h-2.5 bg-accent-lime rounded-sm" />
        <div className="w-2.5 h-2.5 bg-accent-cyan rounded-sm" />
    </motion.div>
);

// Floating icon card (like the reference image)
const FloatingIconCard = ({
    icon,
    className = "",
    delay = 0,
    bgColor = "accent-magenta",
    rotation = 0
}: {
    icon: React.ReactNode;
    className?: string;
    delay?: number;
    bgColor?: string;
    rotation?: number;
}) => (
    <motion.div
        className={`absolute pointer-events-none ${className}`}
        initial={{ opacity: 0, y: 20, rotate: rotation - 5 }}
        animate={{ opacity: 1, y: 0, rotate: rotation }}
        transition={{ delay, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        whileHover={{ scale: 1.1 }}
    >
        <div
            className={`
                p-3 rounded-xl
                bg-gradient-to-br from-${bgColor}/40 to-${bgColor}/20
                border border-${bgColor}/50
                shadow-[0_4px_20px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.15)]
                backdrop-blur-sm
            `}
            style={{ transform: `perspective(500px) rotateY(${rotation * 0.5}deg)` }}
        >
            {icon}
        </div>
    </motion.div>
);

// Crosshair/target element
const Crosshair = ({ className = "" }: { className?: string }) => (
    <motion.div
        className={`absolute ${className}`}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
    >
        <svg width="56" height="56" viewBox="0 0 48 48" className="text-accent-cyan opacity-60">
            <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="1" fill="none" />
            <circle cx="24" cy="24" r="3" fill="currentColor" opacity="0.5" />
            <line x1="24" y1="0" x2="24" y2="12" stroke="currentColor" strokeWidth="1.5" />
            <line x1="24" y1="36" x2="24" y2="48" stroke="currentColor" strokeWidth="1.5" />
            <line x1="0" y1="24" x2="12" y2="24" stroke="currentColor" strokeWidth="1.5" />
            <line x1="36" y1="24" x2="48" y2="24" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    </motion.div>
);

// Wireframe globe
const WireframeSphere = ({ className = "" }: { className?: string }) => (
    <motion.div
        className={`absolute ${className}`}
        animate={{ rotateY: [0, 360] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
    >
        <svg width="100" height="100" viewBox="0 0 80 80" className="text-electric-glow opacity-40">
            <circle cx="40" cy="40" r="35" stroke="currentColor" strokeWidth="0.5" fill="none" />
            <ellipse cx="40" cy="40" rx="35" ry="12" stroke="currentColor" strokeWidth="0.5" fill="none" />
            <ellipse cx="40" cy="40" rx="35" ry="12" stroke="currentColor" strokeWidth="0.5" fill="none"
                transform="rotate(60 40 40)" />
            <ellipse cx="40" cy="40" rx="35" ry="12" stroke="currentColor" strokeWidth="0.5" fill="none"
                transform="rotate(120 40 40)" />
            <ellipse cx="40" cy="40" rx="12" ry="35" stroke="currentColor" strokeWidth="0.5" fill="none" />
        </svg>
    </motion.div>
);

// Waveform display (like reference image)
const WaveformDisplay = ({ className = "" }: { className?: string }) => (
    <motion.div
        className={`absolute ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 0.8 }}
    >
        <svg width="80" height="32" viewBox="0 0 80 32" className="text-accent-cyan">
            <motion.path
                d="M0 16 Q10 8, 20 16 T40 16 T60 16 T80 16"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 1 }}
            />
        </svg>
    </motion.div>
);

// Smiling star mascot (like reference image 1)
const StarMascot = ({ className = "" }: { className?: string }) => (
    <motion.div
        className={`absolute ${className}`}
        initial={{ opacity: 0, scale: 0, rotate: -20 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 1.2, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        whileHover={{ scale: 1.1, rotate: 10 }}
    >
        <svg width="64" height="64" viewBox="0 0 64 64" className="text-accent-warm-yellow drop-shadow-lg">
            {/* Star shape */}
            <path
                d="M32 4L38 22L56 22L42 34L48 52L32 42L16 52L22 34L8 22L26 22L32 4Z"
                fill="currentColor"
            />
            {/* Cute face */}
            <circle cx="26" cy="26" r="2" fill="#1A1A2E" />
            <circle cx="38" cy="26" r="2" fill="#1A1A2E" />
            <path d="M26 32 Q32 38, 38 32" stroke="#1A1A2E" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
    </motion.div>
);

// ============================================
// MAIN HERO COMPONENT
// ============================================

const Hero = () => {
    const [isLowPower, setIsLowPower] = useState(false);
    const twinkles = [
        { top: '14%', left: '24%', size: '2px', delay: '0s', duration: '9s' },
        { top: '22%', right: '18%', size: '3px', delay: '2s', duration: '11s' },
        { top: '36%', left: '10%', size: '2px', delay: '4s', duration: '8s' },
        { top: '42%', right: '8%', size: '2px', delay: '1s', duration: '10s' },
        { top: '58%', left: '16%', size: '3px', delay: '3s', duration: '12s' },
        { top: '64%', right: '22%', size: '2px', delay: '5s', duration: '9s' },
        { top: '72%', left: '30%', size: '2px', delay: '6s', duration: '13s' },
        { top: '78%', right: '30%', size: '3px', delay: '7s', duration: '10s' },
    ];

    useEffect(() => {
        const lowPower =
            window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
            (navigator.deviceMemory && navigator.deviceMemory < 4) ||
            (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4);
        setIsLowPower(!!lowPower);
    }, []);

    return (
        <section className="relative h-screen bg-console-dark overflow-hidden flex items-center justify-center" id="home">
            {/* ======================== */}
            {/* LAYER 0: CONSOLE FRAME / BACKGROUND */}
            {/* ======================== */}

            {/* Dark console texture with vignette */}
            <div className="absolute inset-0 bg-gradient-to-br from-console-dark via-console-frame to-console-dark" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.6)_100%)]" />

            {/* Space backdrop */}
            <SpaceBackdrop className="opacity-60" />

            {/* ======================== */}
            {/* LAYER 1: FLOATING CONSOLE ELEMENTS (scattered around the CRT) */}
            {/* ======================== */}

            {!isLowPower && (
                <>
                    {/* Subtle twinkles around the screen */}
                    <div className="absolute inset-0 pointer-events-none">
                        {twinkles.map((twinkle, index) => (
                            <span
                                key={`twinkle-${index}`}
                                className="absolute rounded-full bg-white-soft/70 screen-twinkle"
                                style={{
                                    top: twinkle.top,
                                    left: twinkle.left,
                                    right: twinkle.right,
                                    width: twinkle.size,
                                    height: twinkle.size,
                                    animationDelay: twinkle.delay,
                                    animationDuration: twinkle.duration,
                                }}
                            />
                        ))}
                    </div>

                    {/* Left side floating icons */}
                    <FloatingIconCard
                        icon={<svg width="28" height="28" viewBox="0 0 24 24" className="text-accent-magenta"><path fill="currentColor" d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" /></svg>}
                        className="top-[18%] left-[4%] hidden lg:block"
                        delay={0.5}
                        bgColor="accent-magenta"
                        rotation={-8}
                    />
                    <FloatingIconCard
                        icon={<svg width="28" height="28" viewBox="0 0 24 24" className="text-accent-lime"><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" fill="none" /><circle cx="12" cy="12" r="3" fill="currentColor" /></svg>}
                        className="top-[45%] left-[3%] hidden lg:block"
                        delay={0.7}
                        bgColor="accent-lime"
                        rotation={5}
                    />
                    <FloatingIconCard
                        icon={<svg width="28" height="28" viewBox="0 0 24 24" className="text-electric-glow"><rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none" /><line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="2" /></svg>}
                        className="bottom-[25%] left-[5%] hidden lg:block"
                        delay={0.9}
                        bgColor="electric-glow"
                        rotation={-3}
                    />

                    {/* Right side floating icons */}
                    <FloatingIconCard
                        icon={<svg width="28" height="28" viewBox="0 0 24 24" className="text-accent-cyan"><path stroke="currentColor" strokeWidth="2" fill="none" d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" /></svg>}
                        className="top-[20%] right-[5%] hidden lg:block"
                        delay={0.6}
                        bgColor="accent-cyan"
                        rotation={12}
                    />
                    <FloatingIconCard
                        icon={<svg width="28" height="28" viewBox="0 0 24 24" className="text-accent-pink"><polygon points="12,2 22,22 2,22" stroke="currentColor" strokeWidth="2" fill="none" /></svg>}
                        className="top-[50%] right-[4%] hidden lg:block"
                        delay={0.8}
                        bgColor="accent-pink"
                        rotation={-6}
                    />
                    <FloatingIconCard
                        icon={<WaveformDisplay />}
                        className="bottom-[28%] right-[6%] hidden lg:block"
                        delay={1.0}
                        bgColor="accent-coral"
                        rotation={4}
                    />

                    {/* Wireframe sphere */}
                    <WireframeSphere className="top-[8%] right-[12%] hidden xl:block" />

                    {/* Crosshair */}
                    <Crosshair className="bottom-[12%] left-[8%] hidden xl:block" />

                    {/* Pixel clusters scattered */}
                    <PixelCluster className="top-[15%] left-[15%]" delay={0.5} />
                    <PixelCluster className="bottom-[20%] right-[12%]" delay={0.7} vertical />
                    <PixelCluster className="top-[70%] left-[8%]" delay={0.9} />
                    <PixelCluster className="top-[35%] right-[10%]" delay={1.1} vertical />
                    <PixelCluster className="bottom-[40%] left-[12%]" delay={0.6} />

                    {/* Star mascot at bottom */}
                    <StarMascot className="bottom-[6%] left-1/2 -translate-x-1/2 hidden lg:block" />

                    {/* Floating chrome logo */}
                    <motion.div
                        className="fixed top-16 right-16 pointer-events-none z-0 hidden xl:block"
                        initial={{ opacity: 0, scale: 0.8, rotate: -12 }}
                        animate={{ opacity: 0.6, scale: 1, rotate: 0 }}
                        transition={{ delay: 0.6, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                    >
                        <div className="w-20 h-20 relative">
                            <img
                                src="/yellow.png"
                                alt=""
                                className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(199,240,0,0.4)]"
                            />
                        </div>
                    </motion.div>

                    {/* Subtle floating stars */}
                    <FloatingStars count={10} />

                    {/* Cursor trail effect */}
                    <CursorTrail />
                </>
            )}

            {/* ======================== */}
            {/* LAYER 2: THE CRT TV - CONVEX/BULGING SCREEN */}
            {/* ======================== */}

            <motion.div
                className="relative z-10 w-full max-w-4xl mx-6 md:mx-8"
                initial={{ opacity: 0, scale: 0.9, rotateX: 5 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                style={{ perspective: '1500px' }}
            >
                {/* CRT TV Outer Shell */}
                <div
                    className="relative p-4 md:p-6 rounded-[2.5rem] md:rounded-[4rem]"
                    style={{
                        background: 'linear-gradient(145deg, #2a2a45 0%, #1a1a2e 50%, #0d0d1a 100%)',
                        boxShadow: `
                            0 40px 80px rgba(0,0,0,0.5),
                            0 20px 40px rgba(0,0,0,0.4),
                            inset 0 2px 0 rgba(255,255,255,0.08),
                            inset 0 -2px 0 rgba(0,0,0,0.3)
                        `,
                    }}
                >
                    {/* CRT bezel highlight (top edge reflection) */}
                    <div className="absolute top-0 left-8 right-8 h-1 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                    {/* LED Indicators */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-4 z-10">
                        <motion.div
                            className="w-2 h-2 rounded-full bg-accent-lime shadow-[0_0_8px_#C7F000]"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <div className="px-3 py-1 rounded-full bg-console-dark border border-white/10 flex items-center">
                            <span className="font-mono text-[8px] text-white/50 tracking-widest uppercase">Signal</span>
                        </div>
                        <motion.div
                            className="w-2 h-2 rounded-full bg-accent-pink shadow-[0_0_8px_#FF00FF]"
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                    </div>

                    {/* The CRT Screen (with bulge effect) */}
                    <div
                        className="relative overflow-hidden rounded-[2rem] md:rounded-[3.5rem] bg-electric-dark"
                        style={{
                            background: 'linear-gradient(135deg, #3B54FF 0%, #2F43FF 50%, #1E2B99 100%)',
                            boxShadow: `
                                inset 0 0 60px rgba(0,0,0,0.3),
                                inset 0 0 120px rgba(0,0,0,0.2),
                                inset 0 -20px 60px rgba(30,43,153,0.5),
                                0 4px 0 rgba(0,0,0,0.3)
                            `,
                            /* CRT bulge illusion */
                            transform: 'perspective(1000px) rotateX(2deg)',
                        }}
                    >
                        {/* Screen glass reflection overlay */}
                        <div
                            className="absolute inset-0 pointer-events-none z-20"
                            style={{
                                background: `
                                    radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,255,255,0.15) 0%, transparent 60%),
                                    radial-gradient(ellipse 100% 100% at 50% 100%, rgba(0,0,0,0.2) 0%, transparent 50%)
                                `,
                            }}
                        />

                        {/* CRT curvature edge shadows */}
                        <div className="absolute inset-0 pointer-events-none z-10 rounded-[2rem] md:rounded-[3.5rem]"
                            style={{
                                boxShadow: `
                                    inset 8px 0 20px rgba(0,0,0,0.3),
                                    inset -8px 0 20px rgba(0,0,0,0.3),
                                    inset 0 8px 20px rgba(0,0,0,0.2),
                                    inset 0 -8px 30px rgba(30,43,153,0.4)
                                `,
                            }}
                        />

                        {/* Screen content */}
                        <div className="relative z-10 p-6 md:p-10 lg:p-12">
                            {/* Dynamic Orbital System (subtle background) */}
                            {!isLowPower && (
                                <div className="absolute inset-0 opacity-15 pointer-events-none">
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px]">
                                        <OrbitalSystem />
                                    </div>
                                </div>
                            )}

                            {/* MAIN BENTO DASHBOARD */}
                            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-4 h-full">

                                {/* 1. IDENTITY MODULE (Span 7) */}
                                <motion.div
                                    className="col-span-1 md:col-span-12 lg:col-span-7 flex flex-col justify-center p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm relative overflow-hidden group"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <div className="relative z-10">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="px-2 py-0.5 rounded-full border border-accent-lime/30 bg-accent-lime/10 text-[10px] text-accent-lime font-mono uppercase tracking-wider flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-accent-lime animate-pulse" />
                                                System Online
                                            </div>
                                            <span className="text-[10px] text-white-soft/40 font-mono">ID: KUSHAL_V1.0</span>
                                        </div>

                                        <div className="mb-4">
                                            <MagnifyingTitle />
                                        </div>

                                        <h2 className="text-lg md:text-xl text-white-soft font-light tracking-wide mb-1">
                                            Systems-First <span className="text-white font-medium">Product Engineer</span>
                                        </h2>
                                        <p className="text-sm text-white-soft/60 font-mono">
                                            Architecture Â· Performance Â· DX
                                        </p>
                                    </div>
                                </motion.div>

                                {/* 2. CORE MODULES / STACK (Span 5) */}
                                <motion.div
                                    className="col-span-1 md:col-span-12 lg:col-span-5 p-5 rounded-2xl border border-white/10 bg-black/20 backdrop-blur-sm flex flex-col relative overflow-hidden"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <h3 className="text-xs font-mono uppercase tracking-widest text-white-soft/50 mb-4 flex items-center gap-2">
                                        <Y2KIcons.Orbit />
                                        Core Modules
                                    </h3>
                                    <div className="grid grid-cols-2 gap-2 flex-1">
                                        {[
                                            { label: "RUST", color: "text-orange-400", bg: "bg-orange-400/10" },
                                            { label: "NEXT.JS", color: "text-white", bg: "bg-white/10" },
                                            { label: "TAURI", color: "text-cyan-400", bg: "bg-cyan-400/10" },
                                            { label: "SYSTEMS", color: "text-purple-400", bg: "bg-purple-400/10" }
                                        ].map((tech, i) => (
                                            <div key={tech.label} className={`flex items-center justify-center p-2 rounded-lg border border-white/5 ${tech.bg} hover:border-white/20 transition-colors`}>
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

                                {/* 3. SYS DIAGNOSTICS / METRICS (Span 5) */}
                                <motion.div
                                    className="col-span-1 md:col-span-6 lg:col-span-5 p-5 rounded-2xl border border-white/10 bg-black/20 backdrop-blur-sm relative"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <h3 className="text-xs font-mono uppercase tracking-widest text-white-soft/50 mb-4 flex items-center gap-2">
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

                                {/* 4. ACTIVE MISSIONS / PROJECTS NAV (Span 7) */}
                                <motion.div
                                    className="col-span-1 md:col-span-6 lg:col-span-7 p-1 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm relative overflow-hidden group cursor-pointer"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <a href="#projects" className="block h-full w-full p-5 relative z-10">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xs font-mono uppercase tracking-widest text-white-soft/50 flex items-center gap-2">
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
                                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-accent-lime/10 text-accent-lime">LIVE</span>
                                                </div>
                                                <p className="text-[10px] text-white-soft/60 line-clamp-1">Music Player</p>
                                            </div>
                                        </div>

                                        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-accent-cyan via-accent-lime to-accent-pink opacity-50 group-hover:opacity-100 transition-opacity" />
                                    </a>
                                </motion.div>
                            </div>
                        </div>

                        {/* CRT scanline effect */}
                        <div
                            className="absolute inset-0 pointer-events-none z-30 opacity-[0.03]"
                            style={{
                                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px)'
                            }}
                        />
                    </div>

                    {/* TV brand/label at bottom of bezel */}
                    <motion.div
                        className="flex justify-center items-center gap-4 mt-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        transition={{ delay: 1 }}
                    >
                        <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/20" />
                        <span className="font-mono text-[10px] text-white-soft/40 tracking-[0.4em] uppercase">
                            Systems Engineering
                        </span>
                        <div className="h-px w-12 bg-gradient-to-l from-transparent to-white/20" />
                    </motion.div>
                </div>
            </motion.div>

            {/* ======================== */}
            {/* SCROLL INDICATOR */}
            {/* ======================== */}
            <motion.div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
            >
                <div className="w-5 h-8 border-2 border-white-soft/30 rounded-full flex items-start justify-center p-1.5">
                    <div className="w-1 h-1.5 bg-accent-lime rounded-full" />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
