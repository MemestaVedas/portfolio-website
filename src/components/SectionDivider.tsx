"use client";

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface SectionDividerProps {
    variant?: 'laser' | 'chrome' | 'grid' | 'constellation';
    className?: string;
}

/**
 * Y2K-styled section dividers to differentiate major content areas.
 * Uses parallax effects for depth and visual interest.
 */
export const SectionDivider: React.FC<SectionDividerProps> = ({
    variant = 'laser',
    className = ''
}) => {
    const { scrollYProgress } = useScroll();

    // Parallax transforms
    const lineX = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);
    const starOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.8, 0.3]);

    if (variant === 'laser') {
        return (
            <div className={`relative h-24 overflow-hidden ${className}`}>
                {/* Central laser line */}
                <motion.div
                    className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2"
                    style={{ x: lineX }}
                >
                    <div
                        className="w-full h-full"
                        style={{
                            background: 'linear-gradient(90deg, transparent 0%, #C7F000 20%, #C7F000 50%, #C7F000 80%, transparent 100%)',
                            boxShadow: '0 0 20px #C7F000, 0 0 40px rgba(199, 240, 0, 0.4)',
                        }}
                    />
                </motion.div>

                {/* Decorative endpoints */}
                <div className="absolute top-1/2 left-8 -translate-y-1/2 w-2 h-2 rounded-full bg-accent-lime shadow-glow" />
                <div className="absolute top-1/2 right-8 -translate-y-1/2 w-2 h-2 rounded-full bg-accent-lime shadow-glow" />
            </div>
        );
    }

    if (variant === 'chrome') {
        return (
            <div className={`relative h-16 overflow-hidden ${className}`}>
                <motion.div
                    className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-[3px] rounded-full"
                    style={{
                        background: 'linear-gradient(90deg, transparent, #a5b4ff 20%, #e0e5ff 50%, #a5b4ff 80%, transparent)',
                        boxShadow: '0 0 15px rgba(165, 180, 255, 0.3)',
                    }}
                />
            </div>
        );
    }

    if (variant === 'grid') {
        return (
            <div className={`relative h-32 overflow-hidden ${className}`}>
                {/* Perspective grid lines fading into distance */}
                <motion.div
                    className="absolute inset-0"
                    style={{ opacity: starOpacity }}
                >
                    <svg viewBox="0 0 1200 100" className="w-full h-full" preserveAspectRatio="none">
                        {/* Horizontal lines */}
                        {[20, 40, 60, 80].map((y, i) => (
                            <line
                                key={`h-${i}`}
                                x1="0" y1={y} x2="1200" y2={y}
                                stroke="rgba(165, 180, 255, 0.15)"
                                strokeWidth="1"
                            />
                        ))}
                        {/* Perspective verticals converging to center */}
                        {[...Array(12)].map((_, i) => {
                            const startX = i * 100;
                            const endX = 600 + (startX - 600) * 0.3;
                            return (
                                <line
                                    key={`v-${i}`}
                                    x1={startX} y1="0" x2={endX} y2="100"
                                    stroke="rgba(165, 180, 255, 0.1)"
                                    strokeWidth="1"
                                />
                            );
                        })}
                    </svg>
                </motion.div>
            </div>
        );
    }

    if (variant === 'constellation') {
        return (
            <div className={`relative h-20 overflow-hidden ${className}`}>
                {/* Scattered star points with connecting lines */}
                <svg viewBox="0 0 1200 80" className="w-full h-full" preserveAspectRatio="none">
                    {/* Connecting lines */}
                    <motion.line
                        x1="100" y1="40" x2="300" y2="30"
                        stroke="rgba(199, 240, 0, 0.3)"
                        strokeWidth="1"
                    />
                    <motion.line
                        x1="300" y1="30" x2="500" y2="50"
                        stroke="rgba(199, 240, 0, 0.3)"
                        strokeWidth="1"
                    />
                    <motion.line
                        x1="500" y1="50" x2="700" y2="35"
                        stroke="rgba(199, 240, 0, 0.3)"
                        strokeWidth="1"
                    />
                    <motion.line
                        x1="700" y1="35" x2="900" y2="45"
                        stroke="rgba(199, 240, 0, 0.3)"
                        strokeWidth="1"
                    />
                    <motion.line
                        x1="900" y1="45" x2="1100" y2="40"
                        stroke="rgba(199, 240, 0, 0.3)"
                        strokeWidth="1"
                    />

                    {/* Star points */}
                    {[
                        { cx: 100, cy: 40 },
                        { cx: 300, cy: 30 },
                        { cx: 500, cy: 50 },
                        { cx: 700, cy: 35 },
                        { cx: 900, cy: 45 },
                        { cx: 1100, cy: 40 },
                    ].map((point, i) => (
                        <motion.circle
                            key={i}
                            cx={point.cx}
                            cy={point.cy}
                            r="4"
                            fill="#C7F000"
                            style={{ filter: 'drop-shadow(0 0 6px #C7F000)' }}
                        />
                    ))}
                </svg>
            </div>
        );
    }

    return null;
};

export default SectionDivider;
