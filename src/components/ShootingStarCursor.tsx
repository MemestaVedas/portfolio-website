"use client";

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useSpring } from 'framer-motion';
import { prefersReducedMotion } from '@/lib/animation';

export const ShootingStarCursor = () => {
    const cursorX = useSpring(-100, { damping: 25, stiffness: 300, mass: 0.1 });
    const cursorY = useSpring(-100, { damping: 25, stiffness: 300, mass: 0.1 });

    const [isPointer, setIsPointer] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const isPointerRef = useRef(false);

    useEffect(() => {
        // Respect reduced motion preference first
        if (prefersReducedMotion()) {
            setIsVisible(false);
            return;
        }

        // Show cursor when a real mouse is used. Touch-only devices won't fire 'mousemove'.
        const moveCursor = (e: MouseEvent) => {
            // Show on first mouse movement
            if (!isVisible) setIsVisible(true);

            cursorX.set(e.clientX);
            cursorY.set(e.clientY);

            const target = e.target as HTMLElement;
            const pointer =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.getAttribute('role') === 'button' ||
                target.closest('a') !== null ||
                target.closest('button') !== null;

            // Only trigger re-render when pointer state actually changes
            if (pointer !== isPointerRef.current) {
                isPointerRef.current = pointer;
                setIsPointer(pointer);
            }
        };

        const touchStart = () => {
            // On touch interaction prefer native touch behavior (hide custom cursor)
            setIsVisible(false);
        };

        window.addEventListener('mousemove', moveCursor, { passive: true });
        window.addEventListener('touchstart', touchStart, { passive: true });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('touchstart', touchStart);
        };
    }, [cursorX, cursorY]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
            {/* Main Cursor (Star) */}
            <motion.div
                className="absolute w-8 h-8 flex items-center justify-center"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%'
                }}
            >
                {/* Rotating Star SVG */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="relative"
                >
                    {/* Glow effect */}
                    <div className={`absolute inset-0 blur-md rounded-full scale-150 transition-colors duration-300 ${isPointer ? 'bg-accent-pink/60' : 'bg-accent-lime/40'}`} />

                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`transition-all duration-300 ${isPointer ? 'text-accent-pink scale-125' : 'text-white'}`}
                    >
                        <path
                            d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"
                            fill="currentColor"
                        />
                    </svg>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ShootingStarCursor;
