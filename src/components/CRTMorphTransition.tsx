"use client";

import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
    motion,
    AnimatePresence,
    MotionValue,
    useMotionValue,
    useTransform,
    useSpring,
    LayoutGroup,
} from 'framer-motion';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface CRTMorphTransitionProps {
    /** Content displayed inside the CRT frame initially (Mission Control dashboard) */
    crtContent: React.ReactNode;
    /** Full website content that slides in during the morph */
    websiteContent: React.ReactNode;
    /** Optional trigger - if not provided, uses internal state */
    isExpanded?: boolean;
    /** Callback when expansion state changes */
    onExpandChange?: (expanded: boolean) => void;
    /** Initial delay before auto-trigger (ms). Set to null to disable auto */
    autoTriggerDelay?: number | null;
    /** Custom easing for the morph transition */
    customEasing?: [number, number, number, number];
    /** Duration of the morph in seconds */
    morphDuration?: number;
    /** Enable CRT scanline overlay during morph */
    enableScanlines?: boolean;
    /** Enable CRT curvature effect */
    enableCurvature?: boolean;
}

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

/**
 * Custom elastic easing curve for organic feel
 * This creates a smooth "bouncy" exit from the starting position
 */
const ORGANIC_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Frame Variants - Controls the CRT container morph
 */
const frameVariants = {
    initial: {
        scale: 1,
        borderRadius: "4rem",
        backgroundColor: "rgba(26, 26, 46, 1)",
    },
    centered: {
        scale: 1,
        borderRadius: "4rem",
        backgroundColor: "rgba(26, 26, 46, 1)",
        transition: {
            duration: 0.6,
            ease: ORGANIC_EASE,
        },
    },
    expanding: {
        scale: 1, // We'll use a calculated scale
        borderRadius: "0rem",
        backgroundColor: "rgba(26, 26, 46, 0)",
        transition: {
            duration: 1.2,
            ease: ORGANIC_EASE,
            borderRadius: { duration: 0.8, ease: ORGANIC_EASE },
            backgroundColor: { duration: 0.6, delay: 0.3 },
        },
    },
    expanded: {
        scale: 1,
        borderRadius: "0rem",
        backgroundColor: "rgba(0, 0, 0, 0)",
        transition: {
            duration: 0.3,
            ease: "easeOut",
        },
    },
};

/**
 * CRT Screen Variants - Controls the inner screen transitions
 */
const screenVariants = {
    visible: {
        opacity: 1,
        transition: { duration: 0.3 },
    },
    fading: {
        opacity: 0.7,
        transition: { duration: 0.4 },
    },
    transparent: {
        opacity: 0,
        transition: { duration: 0.3 },
    },
};

/**
 * Content Exit Variants - CRT content slides up and out
 */
const crtContentVariants = {
    visible: {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        transition: {
            duration: 0.5,
            ease: ORGANIC_EASE,
        },
    },
    exiting: {
        y: "-100%",
        opacity: 0,
        filter: "blur(8px)",
        transition: {
            duration: 0.8,
            ease: ORGANIC_EASE,
        },
    },
};

/**
 * Website Content Enter Variants - Slides up from bottom
 */
const websiteContentVariants = {
    hidden: {
        y: "100%",
        opacity: 0,
        filter: "blur(12px)",
    },
    entering: {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        transition: {
            duration: 1,
            ease: ORGANIC_EASE,
            delay: 0.2,
        },
    },
    visible: {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        transition: {
            duration: 0.3,
            ease: [0.0, 0.0, 0.58, 1.0] as const, // easeOut curve
        },
    },
};

// ============================================================================
// SCANLINE OVERLAY COMPONENT
// ============================================================================

interface ScanlineOverlayProps {
    opacity?: number;
    scale?: MotionValue<number>;
}

const ScanlineOverlay: React.FC<ScanlineOverlayProps> = ({ opacity = 0.03, scale }) => {
    // Calculate inverse scale for background-size to maintain consistent scanline density
    const inverseScale = useTransform(scale ?? useMotionValue(1), (s) => 4 / s);
    const backgroundSize = useTransform(inverseScale, (inv) => `100% ${inv}px`);

    return (
        <motion.div
            className="absolute inset-0 pointer-events-none z-50"
            style={{
                opacity,
                backgroundImage: `repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 2px,
                    rgba(0, 0, 0, 0.15) 2px,
                    rgba(0, 0, 0, 0.15) 4px
                )`,
                backgroundSize,
                mixBlendMode: "overlay",
            }}
        />
    );
};

// ============================================================================
// CRT CURVATURE EFFECT COMPONENT
// ============================================================================

interface CRTCurvatureProps {
    intensity?: number;
}

const CRTCurvature: React.FC<CRTCurvatureProps> = ({ intensity = 1 }) => {
    return (
        <div
            className="absolute inset-0 pointer-events-none z-40"
            style={{
                background: `
                    radial-gradient(ellipse 120% 100% at 50% 0%, transparent 70%, rgba(0, 0, 0, ${0.3 * intensity}) 100%),
                    radial-gradient(ellipse 120% 100% at 50% 100%, transparent 70%, rgba(0, 0, 0, ${0.3 * intensity}) 100%),
                    radial-gradient(ellipse 100% 120% at 0% 50%, transparent 70%, rgba(0, 0, 0, ${0.2 * intensity}) 100%),
                    radial-gradient(ellipse 100% 120% at 100% 50%, transparent 70%, rgba(0, 0, 0, ${0.2 * intensity}) 100%)
                `,
            }}
        />
    );
};

// ============================================================================
// LED INDICATORS COMPONENT
// ============================================================================

interface LEDIndicatorsProps {
    isExpanded: boolean;
}

const LEDIndicators: React.FC<LEDIndicatorsProps> = ({ isExpanded }) => {
    return (
        <motion.div
            className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-4 z-10"
            animate={{
                opacity: isExpanded ? 0 : 1,
                y: isExpanded ? -20 : 0,
            }}
            transition={{ duration: 0.4, ease: ORGANIC_EASE }}
        >
            <motion.div
                className="w-2 h-2 rounded-full bg-accent-lime shadow-[0_0_8px_#C7F000]"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
            />
            <div className="px-3 py-1 rounded-full bg-console-dark border border-white/10 flex items-center">
                <span className="font-mono text-[8px] text-white/50 tracking-widest uppercase">
                    Signal
                </span>
            </div>
            <motion.div
                className="w-2 h-2 rounded-full bg-accent-pink shadow-[0_0_8px_#FF00FF]"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            />
        </motion.div>
    );
};

// ============================================================================
// MAIN CRT MORPH TRANSITION COMPONENT
// ============================================================================

export const CRTMorphTransition: React.FC<CRTMorphTransitionProps> = ({
    crtContent,
    websiteContent,
    isExpanded: externalIsExpanded,
    onExpandChange,
    autoTriggerDelay = null,
    customEasing = ORGANIC_EASE,
    morphDuration = 1.2,
    enableScanlines = true,
    enableCurvature = true,
}) => {
    // ========================================================================
    // STATE & REFS
    // ========================================================================

    const containerRef = useRef<HTMLDivElement>(null);
    const frameRef = useRef<HTMLDivElement>(null);

    // Internal expansion state (used if no external control)
    const [internalExpanded, setInternalExpanded] = useState(false);
    const isExpanded = externalIsExpanded ?? internalExpanded;

    // Phase tracking for complex animation sequencing
    const [phase, setPhase] = useState<'idle' | 'morphing' | 'expanded'>('idle');

    // Dynamic scale calculation
    const [targetScale, setTargetScale] = useState(1);
    const [initialDimensions, setInitialDimensions] = useState({ width: 0, height: 0 });

    // Spring-based scale for smooth interpolation
    const scaleMotionValue = useMotionValue(1);
    const springScale = useSpring(scaleMotionValue, {
        stiffness: 100,
        damping: 20,
        mass: 1,
    });

    // ========================================================================
    // SCALE CALCULATION
    // ========================================================================

    const calculateScale = useCallback(() => {
        if (!frameRef.current) return;

        const frameRect = frameRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Store initial dimensions
        setInitialDimensions({
            width: frameRect.width,
            height: frameRect.height,
        });

        // Calculate scale needed to fill viewport
        // We need to account for the frame's position and scale from center
        const scaleX = viewportWidth / frameRect.width;
        const scaleY = viewportHeight / frameRect.height;

        // Use the larger scale to ensure full coverage
        const scale = Math.max(scaleX, scaleY) * 1.1; // 10% overshoot for safety

        setTargetScale(scale);
    }, []);

    // Recalculate on resize
    useEffect(() => {
        calculateScale();
        window.addEventListener('resize', calculateScale);
        return () => window.removeEventListener('resize', calculateScale);
    }, [calculateScale]);

    // ========================================================================
    // AUTO TRIGGER
    // ========================================================================

    useEffect(() => {
        if (autoTriggerDelay !== null && !isExpanded) {
            const timer = setTimeout(() => {
                handleTrigger();
            }, autoTriggerDelay);
            return () => clearTimeout(timer);
        }
    }, [autoTriggerDelay]);

    // ========================================================================
    // EXPANSION HANDLER
    // ========================================================================

    const handleTrigger = useCallback(() => {
        if (externalIsExpanded === undefined) {
            setInternalExpanded(true);
        }
        onExpandChange?.(true);
        setPhase('morphing');

        // Animate the scale
        scaleMotionValue.set(targetScale);

        // Transition to expanded phase after morph completes
        setTimeout(() => {
            setPhase('expanded');
        }, morphDuration * 1000);
    }, [externalIsExpanded, onExpandChange, targetScale, scaleMotionValue, morphDuration]);

    // Update scale when expanded externally
    useEffect(() => {
        if (isExpanded && phase === 'idle') {
            handleTrigger();
        } else if (!isExpanded && phase !== 'idle') {
            setPhase('idle');
            scaleMotionValue.set(1);
        }
    }, [isExpanded, phase, handleTrigger, scaleMotionValue]);

    // ========================================================================
    // DERIVED VALUES
    // ========================================================================

    // Background transparency during morph
    const backgroundOpacity = useTransform(
        springScale,
        [1, targetScale * 0.5, targetScale],
        [1, 0.5, 0]
    );

    // Border radius morphing
    const borderRadiusValue = useTransform(
        springScale,
        [1, targetScale * 0.3, targetScale],
        ["4rem", "2rem", "0rem"]
    );

    // Scanline opacity - fades during expansion
    const scanlineOpacity = useTransform(
        springScale,
        [1, targetScale * 0.7, targetScale],
        [0.03, 0.015, 0]
    );

    // ========================================================================
    // RENDER
    // ========================================================================

    return (
        <LayoutGroup>
            <div
                ref={containerRef}
                className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
            >
                {/* CRT Frame Container */}
                <motion.div
                    ref={frameRef}
                    layoutId="crt-frame"
                    className="relative pointer-events-auto"
                    style={{
                        scale: springScale,
                        borderRadius: borderRadiusValue,
                        width: phase === 'expanded' ? '100vw' : 'auto',
                        height: phase === 'expanded' ? '100vh' : 'auto',
                        willChange: 'transform',
                    }}
                    onClick={() => phase === 'idle' && handleTrigger()}
                >
                    {/* CRT Outer Shell */}
                    <motion.div
                        className="relative p-4 md:p-6 overflow-hidden"
                        style={{
                            borderRadius: borderRadiusValue,
                            background: useTransform(
                                backgroundOpacity,
                                (o) => `linear-gradient(145deg, 
                                    rgba(42, 42, 69, ${o}) 0%, 
                                    rgba(26, 26, 46, ${o}) 50%, 
                                    rgba(13, 13, 26, ${o}) 100%)`
                            ),
                            boxShadow: phase === 'expanded'
                                ? 'none'
                                : `0 40px 80px rgba(0,0,0,0.5),
                                   0 20px 40px rgba(0,0,0,0.4),
                                   inset 0 2px 0 rgba(255,255,255,0.08),
                                   inset 0 -2px 0 rgba(0,0,0,0.3)`,
                        }}
                    >
                        {/* LED Indicators */}
                        <LEDIndicators isExpanded={isExpanded} />

                        {/* CRT Bezel Highlight */}
                        <motion.div
                            className="absolute top-0 left-8 right-8 h-1 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            animate={{ opacity: isExpanded ? 0 : 1 }}
                            transition={{ duration: 0.3 }}
                        />

                        {/* The CRT Screen */}
                        <motion.div
                            className="relative overflow-hidden w-full"
                            style={{
                                borderRadius: useTransform(
                                    borderRadiusValue,
                                    (r) => {
                                        const numVal = parseFloat(r);
                                        return `${Math.max(0, numVal - 0.5)}rem`;
                                    }
                                ),
                                height: phase === 'expanded' ? '100vh' : '650px',
                                maxWidth: phase === 'expanded' ? '100%' : '1024px',
                                background: useTransform(
                                    backgroundOpacity,
                                    (o) => `linear-gradient(135deg, 
                                        rgba(10,10,10,${o}) 0%, 
                                        rgba(0,0,0,${o}) 50%, 
                                        rgba(10,10,10,${o}) 100%)`
                                ),
                                boxShadow: phase === 'expanded'
                                    ? 'none'
                                    : `inset 0 0 60px rgba(0,0,0,0.8),
                                       inset 0 0 120px rgba(0,0,0,0.6),
                                       inset 0 -20px 60px rgba(0,0,0,0.5),
                                       0 4px 0 rgba(0,0,0,0.3)`,
                                transform: phase === 'expanded'
                                    ? 'none'
                                    : 'perspective(1000px) rotateX(2deg)',
                            }}
                        >
                            {/* Screen Glass Reflection */}
                            <motion.div
                                className="absolute inset-0 pointer-events-none z-20"
                                style={{
                                    background: `
                                        radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,255,255,0.08) 0%, transparent 60%),
                                        radial-gradient(ellipse 100% 100% at 50% 100%, rgba(0,0,0,0.1) 0%, transparent 50%)
                                    `,
                                }}
                                animate={{ opacity: isExpanded ? 0 : 1 }}
                                transition={{ duration: 0.5 }}
                            />

                            {/* CRT Curvature Effect */}
                            {enableCurvature && !isExpanded && (
                                <CRTCurvature intensity={isExpanded ? 0 : 1} />
                            )}

                            {/* Content Container - Handles the scrolling reel effect */}
                            <div className="relative w-full h-full overflow-hidden z-10">
                                <AnimatePresence mode="sync">
                                    {/* CRT Content (slides up and out) */}
                                    {!isExpanded && (
                                        <motion.div
                                            key="crt-content"
                                            className="absolute inset-0 w-full h-full"
                                            variants={crtContentVariants}
                                            initial="visible"
                                            animate={phase === 'morphing' ? 'exiting' : 'visible'}
                                            exit="exiting"
                                        >
                                            {crtContent}
                                        </motion.div>
                                    )}

                                    {/* Website Content (slides up from bottom) */}
                                    {isExpanded && (
                                        <motion.div
                                            key="website-content"
                                            className="absolute inset-0 w-full h-full"
                                            variants={websiteContentVariants}
                                            initial="hidden"
                                            animate={phase === 'expanded' ? 'visible' : 'entering'}
                                        >
                                            {websiteContent}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* CRT Scanline Overlay */}
                            {enableScanlines && (
                                <ScanlineOverlay
                                    opacity={isExpanded ? 0 : 0.03}
                                    scale={springScale}
                                />
                            )}
                        </motion.div>

                        {/* TV Brand Label */}
                        <motion.div
                            className="flex justify-center items-center gap-4 mt-4"
                            animate={{
                                opacity: isExpanded ? 0 : 0.6,
                                y: isExpanded ? 20 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/20" />
                            <span className="font-mono text-[10px] text-white-soft/40 tracking-[0.4em] uppercase">
                                SYSTEM ONLINE
                            </span>
                            <div className="h-px w-12 bg-gradient-to-l from-transparent to-white/20" />
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </LayoutGroup>
    );
};

// ============================================================================
// EXPORTED VARIANTS FOR CUSTOM USAGE
// ============================================================================

export const CRTFrameVariants = frameVariants;
export const CRTContentVariants = crtContentVariants;
export const WebsiteContentVariants = websiteContentVariants;
export const CRT_ORGANIC_EASE = ORGANIC_EASE;

export default CRTMorphTransition;
