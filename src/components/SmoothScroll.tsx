"use client";

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { prefersReducedMotion } from '@/lib/animation';

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        if (prefersReducedMotion()) return;

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
        let rafId: number;

        function raf(time: number) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
};

export default SmoothScroll;
