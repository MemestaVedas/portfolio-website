import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
    maxTilt?: number; // Kept for prop compatibility, but unused
    perspective?: number;
    scale?: number;
    glowColor?: string;
}

/**
 * Enhanced Card with high-performance mouse-following glow.
 * removed 3D tilt as per user preference, but kept the "premium" spotlight feel.
 * Uses MotionValues to prevent React re-renders on mouse move (Zero Jitter).
 */
export const TiltCard: React.FC<TiltCardProps> = ({
    children,
    className = "",
    glowColor = "rgba(199, 240, 0, 0.15)"
}) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth opacity for entrance/exit of glow
    const opacity = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
        opacity.set(1);
    };

    const handleMouseLeave = () => {
        opacity.set(0);
    };

    const background = useMotionTemplate`radial-gradient(
        600px circle at ${mouseX}px ${mouseY}px,
        ${glowColor},
        transparent 40%
    )`;

    const border = useMotionTemplate`radial-gradient(
        400px circle at ${mouseX}px ${mouseY}px,
        rgba(255, 255, 255, 0.3),
        transparent 40%
    )`;

    return (
        <div
            className={`group relative overflow-hidden rounded-xl border border-white-soft/5 bg-white-soft/5 transition-colors hover:bg-white-soft/10 ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Spotlight Glow Effect */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{ background, opacity }}
            />

            {/* Subtle Border Highlight */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{ background: border, opacity }}
                aria-hidden="true"
            />

            {/* Content Container */}
            <div className="relative h-full">
                {children}
            </div>
        </div>
    );
};

// Legacy export for internal compatibility
export const TiltElement = TiltCard;

export default TiltCard;
