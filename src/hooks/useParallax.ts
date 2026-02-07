"use client";

import { useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef } from 'react';

interface ParallaxOptions {
    speed?: number; // Multiplier for parallax effect (negative = opposite direction)
    direction?: 'vertical' | 'horizontal';
    offset?: [string, string]; // Viewport intersection offset
}

interface ParallaxResult {
    ref: React.RefObject<HTMLDivElement | null>;
    y: MotionValue<number>;
    x: MotionValue<number>;
    opacity: MotionValue<number>;
    scale: MotionValue<number>;
}

/**
 * Custom hook for parallax scroll effects
 * Returns transform values based on scroll position and speed multipliers
 */
export function useParallax({
    speed = 0.5,
    direction = 'vertical',
    offset = ["start end", "end start"]
}: ParallaxOptions = {}): ParallaxResult {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: offset as ["start end", "end start"]
    });

    // Parallax movement (speed controls intensity and direction)
    const y = useTransform(
        scrollYProgress,
        [0, 1],
        direction === 'vertical' ? [speed * 100, speed * -100] : [0, 0]
    );

    const x = useTransform(
        scrollYProgress,
        [0, 1],
        direction === 'horizontal' ? [speed * 100, speed * -100] : [0, 0]
    );

    // Fade in/out at edges
    const opacity = useTransform(
        scrollYProgress,
        [0, 0.2, 0.8, 1],
        [0.3, 1, 1, 0.3]
    );

    // Subtle scale effect
    const scale = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        [0.95, 1, 0.95]
    );

    return { ref, y, x, opacity, scale };
}

/**
 * Multi-layer parallax for complex depth effects
 */
export function useMultiLayerParallax(layerCount: number = 3) {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Generate transforms for each layer with increasing speed
    const layers = Array.from({ length: layerCount }, (_, i) => {
        const speed = (i + 1) * 0.15; // Layer 1: 0.15, Layer 2: 0.3, Layer 3: 0.45
        return {
            y: useTransform(scrollYProgress, [0, 1], [speed * 150, speed * -150]),
            opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5]),
            scale: useTransform(scrollYProgress, [0, 0.5, 1], [1 - speed * 0.1, 1, 1 - speed * 0.1])
        };
    });

    return { ref, layers, scrollYProgress };
}

export default useParallax;
