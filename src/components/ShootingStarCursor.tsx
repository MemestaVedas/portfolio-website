"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, AnimatePresence } from 'framer-motion';

// Helper to smooth the path (simple average)
const getPath = (points: { x: number, y: number }[]) => {
    if (points.length < 2) return "";

    // Start with M command
    let d = `M ${points[0].x} ${points[0].y}`;

    // Draw lines to subsequent points
    for (let i = 1; i < points.length; i++) {
        d += ` L ${points[i].x} ${points[i].y}`;
    }

    return d;
};

export const ShootingStarCursor = () => {
    // Spring physics for smooth movement
    const cursorX = useSpring(-100, { damping: 20, stiffness: 300, mass: 0.1 });
    const cursorY = useSpring(-100, { damping: 20, stiffness: 300, mass: 0.1 });

    const [isPointer, setIsPointer] = useState(false);
    const [trail, setTrail] = useState<{ x: number, y: number, id: number }[]>([]);
    const trailIdRef = useRef(0);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);

            // Add trail point
            const newId = trailIdRef.current++;
            setTrail(prev => {
                const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: newId }];
                return newTrail.slice(-20);
            });

            // Optimized Pointer Check
            const target = e.target as HTMLElement;
            setIsPointer(
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.getAttribute('role') === 'button' ||
                target.closest('a') !== null ||
                target.closest('button') !== null
            );
        };

        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, [cursorX, cursorY]);

    // Decay trail when not moving
    useEffect(() => {
        const interval = setInterval(() => {
            setTrail(prev => {
                if (prev.length === 0) return prev;
                return prev.slice(1);
            });
        }, 50);
        return () => clearInterval(interval);
    }, []);

    const pathData = getPath(trail);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
            {/* SVG Layer for the Trail Stroke */}
            <svg className="absolute inset-0 w-full h-full">
                <defs>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                <path
                    d={pathData}
                    fill="none"
                    stroke={isPointer ? "#FF00FF" : "#C7F000"}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#glow)"
                    className="transition-colors duration-300 ease-out opacity-60"
                />
            </svg>

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
