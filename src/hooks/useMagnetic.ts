"use client";

import { useState, useCallback, useRef } from 'react';
import { useSpring, useMotionValue, animate } from 'framer-motion';

interface MagneticOptions {
    strength?: number; // How strong the pull effect is (0-1)
    radius?: number;   // How far the magnetic field extends (in pixels)
    damping?: number;  // Spring damping
    stiffness?: number; // Spring stiffness
}

interface MagneticResult {
    x: ReturnType<typeof useMotionValue<number>>;
    y: ReturnType<typeof useMotionValue<number>>;
    handleMouseMove: (e: React.MouseEvent<HTMLElement>) => void;
    handleMouseLeave: () => void;
    isHovered: boolean;
}

/**
 * Hook for magnetic button/card effects
 * Calculates pull direction based on cursor distance from element center
 */
export function useMagnetic({
    strength = 0.3,
    radius = 150,
    damping = 15,
    stiffness = 150
}: MagneticOptions = {}): MagneticResult {
    const [isHovered, setIsHovered] = useState(false);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const elementRef = useRef<DOMRect | null>(null);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
        const element = e.currentTarget;
        const rect = element.getBoundingClientRect();
        elementRef.current = rect;

        // Calculate center of element
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate distance from cursor to center
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

        // Only apply magnetic effect within radius
        if (distance < radius) {
            setIsHovered(true);
            // Stronger pull when closer to center
            const pullStrength = (1 - distance / radius) * strength;

            animate(x, distanceX * pullStrength, {
                type: "spring",
                stiffness,
                damping
            });
            animate(y, distanceY * pullStrength, {
                type: "spring",
                stiffness,
                damping
            });
        }
    }, [strength, radius, damping, stiffness, x, y]);

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
        // Animate back to original position
        animate(x, 0, { type: "spring", stiffness: stiffness * 1.5, damping: damping * 1.2 });
        animate(y, 0, { type: "spring", stiffness: stiffness * 1.5, damping: damping * 1.2 });
    }, [damping, stiffness, x, y]);

    return { x, y, handleMouseMove, handleMouseLeave, isHovered };
}

/**
 * Hook for 3D tilt effect based on mouse position
 */
export function useTilt({
    maxTilt = 15,
    perspective = 1000,
    scale = 1.02
}: {
    maxTilt?: number;
    perspective?: number;
    scale?: number;
} = {}) {
    const [isHovered, setIsHovered] = useState(false);
    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);
    const scaleValue = useMotionValue(1);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
        const element = e.currentTarget;
        const rect = element.getBoundingClientRect();

        // Calculate position relative to element (0-1)
        const relativeX = (e.clientX - rect.left) / rect.width;
        const relativeY = (e.clientY - rect.top) / rect.height;

        // Convert to rotation (-1 to 1 range, then multiply by maxTilt)
        const tiltX = (relativeY - 0.5) * 2 * maxTilt * -1; // Invert for natural feel
        const tiltY = (relativeX - 0.5) * 2 * maxTilt;

        animate(rotateX, tiltX, { type: "spring", stiffness: 400, damping: 30 });
        animate(rotateY, tiltY, { type: "spring", stiffness: 400, damping: 30 });

        if (!isHovered) {
            setIsHovered(true);
            animate(scaleValue, scale, { type: "spring", stiffness: 400, damping: 30 });
        }
    }, [maxTilt, isHovered, scale, rotateX, rotateY, scaleValue]);

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
        animate(rotateX, 0, { type: "spring", stiffness: 400, damping: 30 });
        animate(rotateY, 0, { type: "spring", stiffness: 400, damping: 30 });
        animate(scaleValue, 1, { type: "spring", stiffness: 400, damping: 30 });
    }, [rotateX, rotateY, scaleValue]);

    return {
        rotateX,
        rotateY,
        scale: scaleValue,
        handleMouseMove,
        handleMouseLeave,
        isHovered,
        perspective,
        style: {
            perspective: `${perspective}px`,
            transformStyle: 'preserve-3d' as const
        }
    };
}

export default useMagnetic;
