"use client";

import { Variants } from 'framer-motion';
import { EASE_OUT, DURATION_NORMAL, DURATION_SLOW, STAGGER_NORMAL } from '@/lib/animation';

interface StaggerOptions {
    staggerChildren?: number;
    delayChildren?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';
    distance?: number;
    duration?: number;
    ease?: number[];
}

/**
 * Hook for orchestrating staggered animations
 * Returns animation variants for container and children elements
 */
export function useStaggeredReveal({
    staggerChildren = STAGGER_NORMAL,
    delayChildren = 0,
    direction = 'up',
    distance = 30,
    duration = DURATION_NORMAL,
    ease = EASE_OUT as number[]
}: StaggerOptions = {}) {

    // Calculate initial position based on direction
    const getInitialTransform = () => {
        switch (direction) {
            case 'up': return { y: distance, x: 0 };
            case 'down': return { y: -distance, x: 0 };
            case 'left': return { y: 0, x: distance };
            case 'right': return { y: 0, x: -distance };
            case 'scale': return { y: 0, x: 0, scale: 0.8 };
            case 'fade': return { y: 0, x: 0 };
            default: return { y: distance, x: 0 };
        }
    };

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren,
                delayChildren,
                when: "beforeChildren"
            }
        }
    };

    const itemVariants: Variants = {
        hidden: {
            opacity: 0,
            ...getInitialTransform()
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            transition: {
                duration,
                ease: EASE_OUT
            }
        }
    };

    return { containerVariants, itemVariants };
}

/**
 * Text reveal animation variants (character by character)
 */
export function useTextReveal({
    staggerChildren = 0.03,
    delayChildren = 0,
    duration = 0.4
}: {
    staggerChildren?: number;
    delayChildren?: number;
    duration?: number;
} = {}) {
    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren,
                delayChildren
            }
        }
    };

    const characterVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 20,
            rotateX: -90
        },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                duration,
                ease: EASE_OUT
            }
        }
    };

    const wordVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 20,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: duration * 1.5,
                ease: EASE_OUT
            }
        }
    };

    return { containerVariants, characterVariants, wordVariants };
}

/**
 * Section reveal with parallax-like entrance
 */
export function useSectionReveal({
    threshold = 0.2,
    duration = 0.8
}: {
    threshold?: number;
    duration?: number;
} = {}) {
    const sectionVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 60,
            scale: 0.98
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration,
                ease: EASE_OUT
            }
        }
    };

    return { sectionVariants, viewport: { once: true, amount: threshold } };
}

export default useStaggeredReveal;
