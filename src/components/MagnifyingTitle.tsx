"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MagnifyingTitle = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    // Track mouse relative to the container for the local mask effect
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <div
            ref={containerRef}
            className="relative inline-block cursor-none select-none"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {/* LAYER 1: Base State (Visible by default) - KUSHAL NAYAK S P */}
            {/* INVERSE MASK: Hide this text where the reveal mask is active */}
            <motion.h1
                className="font-display text-7xl text-white-pure tracking-tight relative z-10"
                style={{
                    maskImage: isHovering
                        ? `radial-gradient(circle 120px at ${mousePosition.x}px ${mousePosition.y}px, transparent 95%, black 100%)`
                        : "none", // Fully visible by default
                    WebkitMaskImage: isHovering
                        ? `radial-gradient(circle 120px at ${mousePosition.x}px ${mousePosition.y}px, transparent 95%, black 100%)`
                        : "none",
                }}
            >
                KUSHAL NAYAK S P
            </motion.h1>

            {/* LAYER 2: Reveal State (Masked) - MEMESTAVEDAS */}
            {/* Using CLIP-PATH or MASK-IMAGE to reveal this layer based on mouse pos */}
            <motion.div
                className="absolute inset-0 z-20 pointer-events-none" // pointer-events-none to let mouse events pass to container
                style={{
                    maskImage: isHovering
                        ? `radial-gradient(circle 120px at ${mousePosition.x}px ${mousePosition.y}px, black 95%, transparent 100%)`
                        : "none",
                    WebkitMaskImage: isHovering
                        ? `radial-gradient(circle 120px at ${mousePosition.x}px ${mousePosition.y}px, black 95%, transparent 100%)`
                        : "none",
                    // Initially hidden if not hovering to prevent flash
                    opacity: isHovering ? 1 : 0,
                }}
            >
                <h1 className="font-druk text-7xl text-accent-cyan tracking-widest">
                    MEMESTAVEDAS
                </h1>
            </motion.div>

            {/* Optional: Custom Cursor/Magnifier Rendered on top */}
            {isHovering && (
                <div
                    className="absolute pointer-events-none border border-accent-cyan/50 rounded-full w-[240px] h-[240px] -translate-x-1/2 -translate-y-1/2 z-30"
                    style={{
                        left: mousePosition.x,
                        top: mousePosition.y,
                        boxShadow: '0 0 20px rgba(0, 240, 255, 0.2)' // Removed inset shadow
                    }}
                />
            )}
        </div>
    );
};

export default MagnifyingTitle;
