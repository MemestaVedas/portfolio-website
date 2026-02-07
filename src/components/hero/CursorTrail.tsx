import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Cursor trail effect (Y2K aesthetic)
// Optimized to reduce react renders using RequestAnimationFrame
export const CursorTrail = () => {
    const [trails, setTrails] = useState<Array<{ id: number, x: number, y: number }>>([]);
    const requestRef = useRef<number | null>(null);
    const mousePos = useRef<{ x: number, y: number } | null>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
        };

        const animate = () => {
            if (mousePos.current) {
                const newTrail = {
                    id: Date.now(),
                    x: mousePos.current.x,
                    y: mousePos.current.y,
                };

                setTrails(prev => {
                    // Only add if significantly different or enough time passed? 
                    // For now, just keep last 8 to match original feel, but maybe check distance?
                    // Actually, to truly optimize, we should limit updates.
                    // But here we are just syncing to RAF.

                    // Simple optimization: Limit array growth strictly
                    const newTrails = [...prev, newTrail];
                    if (newTrails.length > 8) {
                        return newTrails.slice(newTrails.length - 8);
                    }
                    return newTrails;
                });

                // Clear the pos so we don't duplicate trails if mouse stops
                mousePos.current = null;
            }

            // Clean up old trails
            setTrails(prev => {
                const now = Date.now();
                const filtered = prev.filter(t => now - t.id < 800);
                return filtered.length !== prev.length ? filtered : prev;
            });

            requestRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', handleMouseMove);
        requestRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-50">
            {trails.map((trail) => (
                <motion.div
                    key={trail.id}
                    className="absolute w-2 h-2 rounded-full bg-accent-cyan box-shadow-glow"
                    style={{
                        left: trail.x,
                        top: trail.y,
                        boxShadow: '0 0 8px currentColor'
                    }}
                    initial={{ opacity: 0.8, scale: 1 }}
                    animate={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                />
            ))}
        </div>
    );
};
