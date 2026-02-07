"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EasterEggOverlayProps {
    isActive: boolean;
}

/**
 * Glitch effect overlay that activates when user enters the Konami Code.
 * Creates a retro "system unlock" animation.
 */
const EasterEggOverlay: React.FC<EasterEggOverlayProps> = ({ isActive }) => {
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        if (isActive) {
            // Show message after initial glitch
            const timer = setTimeout(() => setShowMessage(true), 500);

            // Hide message after a few seconds
            const hideTimer = setTimeout(() => setShowMessage(false), 4000);

            return () => {
                clearTimeout(timer);
                clearTimeout(hideTimer);
            };
        }
    }, [isActive]);

    return (
        <AnimatePresence>
            {isActive && (
                <>
                    {/* Glitch flash effect */}
                    <motion.div
                        className="fixed inset-0 z-[99999] pointer-events-none"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{
                            background: 'linear-gradient(45deg, #C7F000 0%, #00D9FF 50%, #FF6B9D 100%)',
                            mixBlendMode: 'screen'
                        }}
                    />

                    {/* Glitch scanlines */}
                    <motion.div
                        className="fixed inset-0 z-[99998] pointer-events-none"
                        initial={{ opacity: 0.8 }}
                        animate={{ opacity: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        style={{
                            backgroundImage: `repeating-linear-gradient(
                                0deg,
                                transparent,
                                transparent 2px,
                                rgba(199, 240, 0, 0.1) 2px,
                                rgba(199, 240, 0, 0.1) 4px
                            )`,
                            animation: 'glitchScan 0.1s infinite'
                        }}
                    />

                    {/* Secret message */}
                    <AnimatePresence>
                        {showMessage && (
                            <motion.div
                                className="fixed inset-0 z-[99997] flex items-center justify-center pointer-events-none"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.2 }}
                                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                            >
                                <div className="text-center">
                                    <motion.div
                                        className="mb-4"
                                        animate={{
                                            rotate: [0, 5, -5, 0],
                                            scale: [1, 1.05, 1]
                                        }}
                                        transition={{ duration: 0.5, repeat: 2 }}
                                    >
                                        <span className="text-6xl">🎮</span>
                                    </motion.div>

                                    <h2
                                        className="font-display text-4xl md:text-6xl mb-4"
                                        style={{
                                            background: 'linear-gradient(90deg, #C7F000, #00D9FF, #FF6B9D)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            textShadow: '0 0 40px rgba(199, 240, 0, 0.5)'
                                        }}
                                    >
                                        KONAMI UNLOCKED
                                    </h2>

                                    <p className="font-mono text-white-soft/70 text-sm tracking-wider">
                                        You found the secret! Thanks for exploring 💎
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </>
            )}
        </AnimatePresence>
    );
};

export default EasterEggOverlay;
