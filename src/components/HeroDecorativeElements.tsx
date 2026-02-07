"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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

/**
 * Decorative Elements Layer
 * Floating icons, shapes, and effects that move with parallax
 */
export const HeroDecorativeElements = () => {
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

    if (isLowPower) return null;

    return (
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
        </>
    );
};

export default HeroDecorativeElements;
