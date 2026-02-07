"use client";

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxSectionProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
    bgLayers?: {
        content?: React.ReactNode;
        speed?: number;
        className?: string;
    }[];
    enableSnap?: boolean;
}

/**
 * Wrapper component with multi-layer parallax
 * Configurable speed and direction per layer with snap-to-section behavior
 */
export const ParallaxSection: React.FC<ParallaxSectionProps> = ({
    children,
    className = "",
    id,
    bgLayers = [],
    enableSnap = true
}) => {
    const ref = React.useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    return (
        <section
            ref={ref}
            id={id}
            className={`relative overflow-hidden ${enableSnap ? 'scroll-mt-0' : ''} ${className}`}
            style={{
                scrollSnapAlign: enableSnap ? 'start' : undefined
            }}
        >
            {/* Background Parallax Layers */}
            {bgLayers.map((layer, index) => {
                const speed = layer.speed ?? (index + 1) * 0.1;
                const y = useTransform(scrollYProgress, [0, 1], [`${speed * 50}%`, `${-speed * 50}%`]);

                return (
                    <motion.div
                        key={index}
                        className={`absolute inset-0 pointer-events-none ${layer.className || ''}`}
                        style={{ y }}
                    >
                        {layer.content}
                    </motion.div>
                );
            })}

            {/* Main Content */}
            <div className="relative z-10">
                {children}
            </div>
        </section>
    );
};

/**
 * Floating parallax element that moves independently
 */
export const ParallaxFloat: React.FC<{
    children: React.ReactNode;
    speed?: number;
    direction?: 'up' | 'down';
    className?: string;
}> = ({ children, speed = 0.5, direction = 'up', className = "" }) => {
    const ref = React.useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const multiplier = direction === 'up' ? -1 : 1;
    const y = useTransform(scrollYProgress, [0, 1], [speed * 100 * multiplier, speed * -100 * multiplier]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5]);

    return (
        <motion.div
            ref={ref}
            className={className}
            style={{ y, opacity }}
        >
            {children}
        </motion.div>
    );
};

/**
 * Scroll progress-aware reveal
 */
export const ScrollReveal: React.FC<{
    children: React.ReactNode;
    className?: string;
    direction?: 'up' | 'down' | 'left' | 'right';
    delay?: number;
}> = ({ children, className = "", direction = 'up', delay = 0 }) => {
    const directionMap = {
        up: { y: 60, x: 0 },
        down: { y: -60, x: 0 },
        left: { y: 0, x: 60 },
        right: { y: 0, x: -60 }
    };

    const initial = directionMap[direction];

    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, ...initial }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
                duration: 0.8,
                delay,
                ease: [0.23, 1, 0.32, 1]
            }}
        >
            {children}
        </motion.div>
    );
};

export default ParallaxSection;
