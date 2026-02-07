import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';

// Cursor trail effect (Y2K aesthetic)
// Optimized to ZERO react renders using MotionValues and Springs
export const CursorTrail = () => {
    // Create a pool of "ghost" cursors
    // We use springs to make them follow each other with delay
    const cursorCount = 12;
    const cursors = Array.from({ length: cursorCount }).map((_, i) => ({
        x: useMotionValue(0),
        y: useMotionValue(0),
        key: i
    }));

    // We only need one spring configuration for smooth following
    const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };

    // Refs to track actual mouse position without state
    const mousePos = useRef({ x: -100, y: -100 });
    const rafId = useRef<number | null>(null);

    useEffect(() => {
        // Initialize off-screen
        cursors.forEach(c => {
            c.x.set(-100);
            c.y.set(-100);
        });

        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };

            // Should active cursor be visible? handled by CSS or initial pos
        };

        // Physics loop
        const updatePhysics = () => {
            let targetX = mousePos.current.x;
            let targetY = mousePos.current.y;

            // Update first cursor to follow mouse directly (or with very tight spring)
            // Then each subsequent cursor follows the previous one
            cursors.forEach((cursor, i) => {
                const currentX = cursor.x.get();
                const currentY = cursor.y.get();

                // Simple lerp for trail effect (cheaper than spring hook for many items)
                // The delay increases with index
                const lerpFactor = 0.35 - (i * 0.02); // 0.35 -> 0.15

                const nextX = currentX + (targetX - currentX) * lerpFactor;
                const nextY = currentY + (targetY - currentY) * lerpFactor;

                cursor.x.set(nextX);
                cursor.y.set(nextY);

                // The next cursor follows THIS cursor's *current* position (creating a chain)
                // Actually, for a "following" trail, they should all follow the mouse but with different delay/lerp?
                // OR follow the previous one? Following previous one creates a "snake" effect.
                // Following mouse with different lerp creates a "swarm" or "echo" effect.
                // The original code was an echo (trails stayed where they were spawned).

                // To mimic original "fading trail" effect without adding/removing nodes:
                // We can't easily do "stay where spawned" with a fixed pool without cycling them.
                // BUT, a snake effect is usually more performant and looks cooler for Y2K.
                // Let's stick to the "snake/follow" effect for max performance.

                targetX = nextX;
                targetY = nextY;
            });

            rafId.current = requestAnimationFrame(updatePhysics);
        };

        window.addEventListener('mousemove', handleMouseMove);
        rafId.current = requestAnimationFrame(updatePhysics);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (rafId.current) cancelAnimationFrame(rafId.current);
        };
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-50">
            {cursors.map((cursor, i) => (
                <motion.div
                    key={cursor.key}
                    className="absolute w-2 h-2 rounded-full bg-accent-cyan box-shadow-glow"
                    style={{
                        x: cursor.x, // Use x/y transform instead of left/top for performance
                        y: cursor.y,
                        boxShadow: '0 0 8px currentColor',
                        opacity: 1 - (i / cursorCount), // Fade out tail
                        scale: 1 - (i / cursorCount) * 0.5, // Shrink tail
                    }}
                />
            ))}
        </div>
    );
};
