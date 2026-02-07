import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Y2KIcons } from '../Y2KIcons';

// Floating stars with twinkle effect
export const FloatingStars = ({ count }: { count: number }) => {
    const [stars, setStars] = useState<Array<{
        id: number;
        x: number;
        y: number;
        size: number;
        delay: number;
        duration: number;
    }>>([]);

    useEffect(() => {
        const generatedStars = Array.from({ length: count }, (_, i) => ({
            id: i,
            x: Math.random() * 100, // Random percentage
            y: Math.random() * 100,
            size: 2 + Math.random() * 2, // Slightly larger variation
            delay: i * 0.5,
            duration: 3 + Math.random() * 4,
        }));
        setStars(generatedStars);
    }, [count]);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {stars.map(star => (
                <motion.div
                    key={star.id}
                    className="absolute"
                    style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                    }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{
                        opacity: [0, 0.8, 0],
                        scale: [0.5, 1.2, 0.5], // Twinkle
                        y: [0, -20, 0], // Float
                    }}
                    transition={{
                        duration: star.duration,
                        delay: star.delay,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                >
                    <div className="w-full h-full text-accent-lime">
                        <Y2KIcons.Star className="w-full h-full" />
                    </div>
                </motion.div>
            ))}
        </div>
    );
};
