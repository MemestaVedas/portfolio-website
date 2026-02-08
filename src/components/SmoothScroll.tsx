"use client";

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Initialize Lenis with smooth, Apple-like easing
        const lenis = new Lenis({
            lerp: 0.07, // Smoother, slightly heavier feel
            duration: 1.2, // Longer settling time for elegance
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential Out
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 0.9, // slightly reduced speed for control
            touchMultiplier: 1.5, // slightly reduced sensitivity for mobile
        });

        lenisRef.current = lenis;

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
};

export default SmoothScroll;
