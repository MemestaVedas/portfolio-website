/**
 * Shared Animation Constants
 * Single source of truth for all easing curves, durations, and spring configs.
 * Ensures consistency across every transition in the portfolio.
 */

// ============================================================================
// EASING CURVES
// ============================================================================

/** Primary easing — smooth deceleration for entrances/reveals */
export const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];

/** Organic easing — slightly different feel for morph/expansion */
export const EASE_ORGANIC: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Sharp easing — snappy for panel slides (onboarding/page transition) */
export const EASE_SHARP: [number, number, number, number] = [0.76, 0, 0.24, 1];

/** Springy overshoot — decorative elements only */
export const EASE_SPRING: [number, number, number, number] = [0.34, 1.56, 0.64, 1];

// ============================================================================
// DURATIONS (seconds)
// ============================================================================

/** Micro-interactions: hovers, toggles, color changes */
export const DURATION_FAST = 0.2;

/** Standard transitions: reveals, fades, content swaps */
export const DURATION_NORMAL = 0.5;

/** Emphatic transitions: page transitions, morph, hero entrance */
export const DURATION_SLOW = 0.8;

/** Cinematic: CRT morph expansion */
export const DURATION_CINEMATIC = 1.2;

// ============================================================================
// SPRING CONFIGS (Framer Motion)
// ============================================================================

/** Snappy spring — buttons, nav items, small interactions */
export const SPRING_SNAPPY = { stiffness: 400, damping: 30 } as const;

/** Smooth spring — cards, panels, magnetic effects */
export const SPRING_SMOOTH = { stiffness: 200, damping: 20 } as const;

/** Bouncy spring — decorative pops, staggered reveals */
export const SPRING_BOUNCY = { stiffness: 260, damping: 20 } as const;

/** Heavy spring — CRT morph, large-scale transforms */
export const SPRING_HEAVY = { stiffness: 100, damping: 20, mass: 1 } as const;

// ============================================================================
// STAGGER DELAYS (seconds)
// ============================================================================

export const STAGGER_FAST = 0.05;
export const STAGGER_NORMAL = 0.08;
export const STAGGER_SLOW = 0.15;

// ============================================================================
// REDUCED MOTION HELPER
// ============================================================================

/** Check if user prefers reduced motion (call in useEffect only) */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Returns instant transitions if reduced motion is preferred */
export function getReducedMotionProps() {
  return {
    transition: { duration: 0 },
    initial: false,
  };
}
